// Jenkinsfile — first declarative pipeline for the starter app.
// Requires: NodeJS plugin + a NodeJS tool named exactly 'node24'
// (Manage Jenkins -> Tools -> NodeJS installations).
pipeline {
    agent any

    tools {
        nodejs 'node24'
    }

    stages {
        stage('Install') {
            steps {
                sh 'node --version && npm --version'
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'public/build-info.json', fingerprint: true
            }
        }
    }

    post {
        success {
            echo "Build #${env.BUILD_NUMBER} is green - artifact archived."
        }
        failure {
            echo "Build #${env.BUILD_NUMBER} failed - open the red stage and read its log."
        }
    }
}
