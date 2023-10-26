# this deploy.sh is for scp the dist folder to aws ec2 on Edward's computer, I know this sounds odd, there is always a better way to do 
# this can be done by github-action + aws-cli, but for the sake of simplicity to keep allthings in command line without debug the CI/CD process or use render(a slow process) 
# local build seems the best options
# 1. clear old dist
rm -rf dist;
# 2. replace env
mv .env .env.temp;
touch .env;
echo "VITE_NODE_ENV=production\nVITE_API_HOST=https://cantek.ekhome.life/api">.env;
# 3. build application
npm run build;
# 4. recover env
mv .env.temp .env;
# 5. scp (please refer whatsapp for the pem file or ask edward)
ssh -i /Users/edwardwong/Desktop/cantek2023OctWebECEC.pem ubuntu@ec2-13-51-176-242.eu-north-1.compute.amazonaws.com "rm -rf /home/ubuntu/front-end/dist; mkdir -p /home/ubuntu/front-end;"
scp -i /Users/edwardwong/Desktop/cantek2023OctWebECEC.pem -r ./dist ubuntu@ec2-13-51-176-242.eu-north-1.compute.amazonaws.com:/home/ubuntu/front-end/dist;