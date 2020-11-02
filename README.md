
<p align="center"><img width=30.5% src="https://github.com/ddos-clearing-house/ddos_dissector/blob/3.0/media/header.png?raw=true"></p>




&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![Python](https://img.shields.io/badge/python-v3.6+-blue.svg)
[![Build Status](https://api.travis-ci.com/joaoceron/new_dissector.svg?token=8TMUECLCUVrxas7wXfVY&branch=master)](https://travis-ci.com/github/joaoceron/new_dissector)
[![GitHub Issues](https://img.shields.io/github/issues/ddos-clearing-house/ddos_dissector)](https://github.com/ddos-clearing-house/ddos_dissector/issues)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
<img alt="GitHub commits since tagged version" src="https://img.shields.io/github/last-commit/ddos-clearing-house/ddos_dissector">

 <p align="center">
  <img width=30.5% src="https://github.com/ddos-clearing-house/dddosdb-in-a-box/blob/master/imgs/concordia-logo.png?raw=true">
 <p align="center"><img width=30.5% src="https://github.com/ddos-clearing-house/dddosdb-in-a-box/blob/master/imgs/No-More-DDoS-2-removebg-preview.png?raw=true"></p>

</p>

# DDoS Clearing House

DDoSCH is a platform used to share DDoS fingerprints. The system is composed of a set of software modules available in this repository and described in our research  [paper](https://research.utwente.nl/en/publications/ddos-as-a-service-investigating-booter-websites](https://research.utwente.nl/en/publications/ddos-as-a-service-investigating-booter-websites)). 


<p align="center"><img width=80% src="https://raw.githubusercontent.com/ddos-clearing-house/DDOS-CH/main/media/overview.png"></p>

- [Dissector](https://github.com/ddos-clearing-house/ddos_dissector):  responsible for summarizing the DDoS traffic and generate the proper fingerprint.
- [DDoSDB](https://github.com/ddos-clearing-house/ddosdb/blob/master/README_ddosdb.md):  this is the backend database and graphical interface used to share the fingerprints.
- [Converters](https://github.com/ddos-clearing-house/converters):  translate fingerprints to mitigation rules.

### Ready-to-go setup
We have a VM (Virtual Machine) with all the required components to run in a test environment. We named this VM as [DDoSDB-in-a-box](https://github.com/ddos-clearing-house/dddosdb-in-a-box).
Just spin the VM and you have everything in place. 

## DDoSDB repository
### Installation process
