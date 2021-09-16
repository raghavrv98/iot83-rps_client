#bin/bash
npm run build 
tar -czvf pmmpUi.tar.gz build/
scp -i ~/Documents/pems/devops.pem ~/Documents/83incs/frontend/iot_cloud_frontend_pmmp/pmmpUi.tar.gz ubuntu@3.221.79.81:~/setup/pmmpDockerML/ui/
ssh -i ~/Documents/pems/devops.pem ubuntu@3.221.79.81 << 'EOF'
cd ~/setup/pmmpDockerML/ui/
rm -rf buildBackup
mv build buildBackup
tar -xzvf pmmpUi.tar.gz
cd ../
sudo docker-compose restart ui
EOF

