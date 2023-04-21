pipeline {
    agent any
    
    stages {
        
        stage('Creating Docker image') {
            steps {
                //Builds the image of our application
                sh 'sudo docker build -t itslaz/ecom-f:latest .'
            }
        }

        stage('Deploying into docker container') {
            steps {
                //Stop any running containers of this image
                sh 'sudo docker rm -f $(sudo docker ps -af name=ecommerce-frontend -q)'
                
                //Run latest version of image in a container
                sh 'sudo docker run -d -p 80:3000 --name ecommerce-frontend itslaz/ecom-f:latest'
            }
        }
    }
}