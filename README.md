# Sandbox Projekt

Getting Started
---
Template-Vorlage für das Aufsetzen eines Projekts

### Vagrant
To use the vagrant setup, you need to install Vagrant from hashicorp and Oracle VM VirtualBox 

Run vagrant up to start the box setup. The first run takes a while, subsequent runs are a lot faster. 

During the initial setup, some red errors and warnings will pop up in the console but most of them are regarding warnings or unnecessary components 
```
vagrant up

```

Vagrant uses the following provisioning:
```sh
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential
sudo npm install -g grunt-cli
mkdir ~/node_modules
ln -s ~/node_modules /vagrant/node_modules
sudo apt-get install -y apache2 php5 libapache2-mod-php5 php5-mcrypt
sudo rm -rf /var/www/html
sudo ln -s /vagrant /var/www/html

```

Dependency installation: (!! sass module currently fails on first install !!)
```
vagrant ssh -c "cd /vagrant && npm install && npm rebuild node-sass"

```

Dev Build:
```
vagrant ssh -c "cd /vagrant && grunt"

```

Prod Build:
```
vagrant ssh -c "cd /vagrant && grunt prod"

```

### xampp
navigate to the project directory and follow the steps for a vagrant setup but execute them directly, not via vagrant ssh or inside the /vagrant box but the project root directory

Have Fun!