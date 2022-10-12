---
date: "2022-10-11"
slug: "/blog-posts/set-up-openldap-master-master-replication-on-centos7/"
title: "Set up OpenLDAP master master replication on CentOS 7"
description: "Synchronize directory information data among multiple OpenLDAP master servers on CentOS 7, each of them can replicate new change from other OpenLDAP servers"
featuredImage: configure-openldap-login-for-centos7.png
---
OpenLDAP plays an important role in enterprise computing environment, it makes sense that we have multiple LDAP servers to achieve high availability and better performance. The former one is about having LDAP service always up, your clients can failover to other OpenLDAP servers if the server they used to talk to is down. The latter one is about distributing OpenLDAP servers in different regions, it allows clients in each region can talk to the nearby OpenLDAP servers, which reduces the network latency and have better performance.

If you want to have multiple OpenLDAP servers, the first issue you need to solve is the synchronization between them, you need to ensure that the directory data in each server is the same and the data updated in any of each OpenLDAP server will populate to other OpenLDAP servers as well. Otherwise, such inconsistency will cause authentication fails and improper identity handling.

In this guide, I will share how to set up master-master replication for OpenLDAP on CentOS 7.

## Concepts
Regarding OpenLDAP directory information data replication, each OpenLDAP server can play as a provider and/or consumer role. Being as a provider, your counterpart, consumer will pull the directory data from you. It's worth mentioned that a server can play as both provider and consumer, which means that it can replicate the data from other OpenLDAP servers as a consumer and any change in this server will be populated into other OpenLDAP servers given that it's a provider.

In general, OpenLDAP replication can be achieved in master-slave model or master-master model. In master-slave model, there is only 1 provider and other LDAP servers are consumers, you can only update directory information in the provider. In master-master model, each server is a provider and consumer, you can update any of them.

## Configuration
In the below set up, we assume you have 2 OpenLDAP servers, LDAP1 & LDAP2. The below configuration is for LDAP1 only, you need to do it again for LDAP2 such that they can perform master-master replication

### OpenLDAP replication service account and access control lists (ACL)
You can create a service account for OpenLDAP server to pull the data from another OpenLDAP server

Create a service account on LDAP2 server.
```bash
# Specify replicator attributes
cat > replicator.ldif << EOF
dn: cn=replicator,dc=abc,dc=local
objectClass: simpleSecurityObject
objectClass: organizationalRole
cn: replicator
description: Replication user
userPassword: {CRYPT}x
EOF

# Create the replication service account
ldapadd -x -ZZ -D cn=admin,dc=abc,dc=local -W -f replicator.ldif

# Change replication service account password
ldappasswd -x -D cn=admin,dc=abc,dc=local -W -S cn=replicator,dc=abc,dc=local
```
![Replication service account](../../images/set-up-openldap-master-master-replication-on-centos7/replication-service-account.png)

Configure ACL to allow this service account to access all directory information with no search limit
```bash
# Update ACL and search limit
cat > replicator-acl-limits.ldif << EOF
dn: olcDatabase={2}hdb,cn=config
changetype: modify
add: olcAccess
olcAccess: {0}to *
  by dn.exact="cn=replicator,dc=abc,dc=local" read
  by * break
-
add: olcLimits
olcLimits: dn.exact="cn=replicator,dc=abc,dc=local"
  time.soft=unlimited time.hard=unlimited
  size.soft=unlimited size.hard=unlimited
EOF

# Apply ACL & search limit configuration
sudo ldapmodify -Y EXTERNAL -H ldapi:/// -f replicator-acl-limits.ldif
```
![Replication service account ACL and search limit](../../images/set-up-openldap-master-master-replication-on-centos7/replication-service-account-acl-and-search-limit.png)

### Provider Configuration
Enable & configure syncprov module on LDAP1 server
```bash
# Enable syncprov module
cat > syncprov_module.ldif << EOF
dn: cn=module,cn=config
objectClass: olcModuleList
cn: module
olcModulePath: /usr/lib64/openldap
olcModuleLoad: syncprov.la
EOF

sudo ldapadd -Y EXTERNAL -H ldapi:/// -f syncprov_module.ldif

# Configure syncprov module
cat > syncprov.ldif << EOF
dn: olcOverlay=syncprov,olcDatabase={2}hdb,cn=config
objectClass: olcOverlayConfig
objectClass: olcSyncProvConfig
olcOverlay: syncprov
olcSpSessionLog: 100
EOF

sudo ldapadd -Y EXTERNAL -H ldapi:/// -f syncprov.ldif
```
![Provider Configuration](../../images/set-up-openldap-master-master-replication-on-centos7/provider-configuration.png)

### Consumer Configuration
Regarding consumer configuration on LDAP1 server, you need to specify
1. **olcServerID**, global unique ID among all OpenLDAP servers
2. **rid**. local unique ID for each provider within the configuration file
3. **provider**, OpenLDAP server you want to replicate data from
4. **binddn**, the account you use to pull data from another OpenLDAP server
5. **credentials**, the password of the account specified in 2
6. **searchbase**, usually the domain you want to replicate from
7. **starttls**, specify it if your provider use StartTLS, something as we mentioned [before](/blog-posts/configure-starttls-to-encrypt-openldap-connection-on-centos7/)
8. **tls_cacert**, CA cert for StartTLS

```bash
# Consumer configuration
cat > ldap1.ldif << EOF
# create new
dn: cn=config
changetype: modify
replace: olcServerID
# specify unique ID number on each server
olcServerID: 1

dn: olcDatabase={2}hdb,cn=config
changetype: modify
add: olcSyncRepl
olcSyncRepl: rid=002
  provider=ldap://ldap2.abc.local:389/
  bindmethod=simple
  starttls=yes
  binddn="cn=rid,dc=abc,dc=local"
  credentials=<<your-service-account-password>>
  searchbase="dc=abc,dc=local"
  scope=sub
  schemachecking=on
  type=refreshAndPersist
  retry="30 5 300 3"
  interval=00:00:05:00
  tls_cacert=/etc/openldap/certs/rootCA.pem
-
add: olcMirrorMode
olcMirrorMode: TRUE

dn: olcOverlay=syncprov,olcDatabase={2}hdb,cn=config
changetype: add
objectClass: olcOverlayConfig
objectClass: olcSyncProvConfig
olcOverlay: syncprov
EOF

sudo sudo ldapadd -Y EXTERNAL -H ldapi:/// -f ldap1.ldif
```
![Consumer Configuration](../../images/set-up-openldap-master-master-replication-on-centos7/consumer-configuration.png)

## OpenLDAP master-master replication verification
Create an user on LDAP1 server

```bash
# Specify user-a attributes
cat > create_user-a.ldif << EOF
dn: uid=user-a,ou=People,dc=abc,dc=local
objectClass: inetOrgPerson
objectClass: posixAccount
objectClass: shadowAccount
uid: user-a
sn: user-a
givenName: user-a
cn: user-a
displayName: user-a
uidNumber: 80001
gidNumber: 8001
userPassword: {CRYPT}x
gecos: user-a
loginShell: /bin/bash
homeDirectory: /home/user-a
EOF

# Create user-a
ldapadd -x -D cn=admin,dc=abc,dc=local -W -f create_user-a.ldif
```

Create an user on LDAP2 server
```bash
cat > create_user-a.ldif << EOF
dn: uid=user-b,ou=People,dc=abc,dc=local
objectClass: inetOrgPerson
objectClass: posixAccount
objectClass: shadowAccount
uid: user-b
sn: user-b
givenName: user-b
cn: user-b
displayName: user-b
uidNumber: 80002
gidNumber: 8002
userPassword: {CRYPT}x
gecos: user-b
loginShell: /bin/bash
homeDirectory: /home/user-b
EOF

# Create user-b
ldapadd -x -D cn=admin,dc=abc,dc=local -W -f create_user-b.ldif
```

Search the users
```bash
# Run on LDAP2
ldapsearch -x -LLL  -D cn=admin,dc=abc,dc=local -W -b dc=abc,dc=local '(uid=user-a)' uid sn cn
# Run on LDAP1
ldapsearch -x -LLL  -D cn=admin,dc=abc,dc=local -W -b dc=abc,dc=local '(uid=user-b)' uid sn cn
```
![Master-master OpenLDAP replication verification](../../images/set-up-openldap-master-master-replication-on-centos7/master-master-openldap-replication-verification.png)

## Conclusion
In this guide, we discuss the benefits of having multiple OpenLDAP servers, cover a guide to make them synchronized through master-master replication which any update on any server will be populated into all other servers.

Blog: [https://joeho.xyz](https://joeho.xyz)

LinkedIn: [https://www.linkedin.com/in/ho-cho-tai-0260758a](https://www.linkedin.com/in/ho-cho-tai-0260758a)