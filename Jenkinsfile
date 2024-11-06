pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/AbhishekHerbertSamuel/multi-container-auth-app.git'
            }
        }

        stage('Build and Deploy Containers') {
            steps {
                script {
                    // Stop any existing containers
                    sh 'docker-compose down || true'
                    
                    // Build and start new containers
                    sh 'docker-compose up -d --build'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up dangling images...'
            sh 'docker image prune -f || true'
        }
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
