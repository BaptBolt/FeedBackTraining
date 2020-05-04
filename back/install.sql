
CREATE DATABASE feedbacktraining;

USE feedbacktraining;

CREATE TABLE user(
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR(250) NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE information(
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  nightValue DECIMAL(2,1) NOT NULL,
  nightHours VARCHAR(10) NOT NULL,
  mentalDisposition DECIMAL(2,1) NOT NULL,
  trainingIntensity DECIMAL(2,1) NOT NULL,
  trainingEfficience DECIMAL(2,1) NOT NULL,
  muscleTensionDValue DECIMAL(2,1),
  muscleTensionD TEXT,
  muscleTensionGValue DECIMAL(2,1),
  muscleTensionG TEXT,
  dateAjout DATETIME,
  userID INT NOT NULL,
  FOREIGN KEY(userID) REFERENCES user (id)
);

