const dns = require('dns');

dns.setDefaultResultOrder('ipv4first');

// Only override DNS servers when explicitly requested. Forcing public DNS can
// break Atlas SRV lookups on some networks and cause getaddrinfo ENOTFOUND.
if (process.env.USE_PUBLIC_DNS === 'true') {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
}
