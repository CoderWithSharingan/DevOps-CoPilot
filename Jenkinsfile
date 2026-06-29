pipeline{
    agent any
     stages{
        stage('Checkout Source'){
            steps{
            git branch: 'Groq_Migration',
                url: 'https://github.com/CoderWithSharingan/DevOps-CoPilot.git'
            }
        }
        stage('Install Backend Dependencies'){
            steps{
                dir('backend')
                    sh 'pip install -r requirements.txt'
            }
        }
        stage('Install Frontend Dependencies'){
            steps{
                dir('Frontend')
                    sh 'npm install'
            }
        }
     }    
}
