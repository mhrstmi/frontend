echo "switching to branch main"
git checkout main
echo "building app..."
yarn build 
echo "Deploying files to server..."
scp -r dist/* ubuntu@188.213.197.187:/var/www/188.213.197.187/
echo "Done :)"