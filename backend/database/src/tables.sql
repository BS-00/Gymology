USE gymologydb;

CREATE TABLE Users (
	uid SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	email TEXT NOT NULL,
	password TEXT NOT NULL,
	
	PRIMARY KEY(uid)
);

CREATE TABLE Workouts (
	wid SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	uid SMALLINT UNSIGNED,
	name TEXT NOT NULL,
	days SET('M', 'TU', 'W', 'TH', 'F', 'SA ', 'SU'),
		
	PRIMARY KEY(wid),
	FOREIGN KEY(uid)
		REFERENCES Users(uid)
);

CREATE TABLE Exercises (
	eid SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	wid SMALLINT UNSIGNED,
	sets TINYINT UNSIGNED NOT NULL,
	reps TINYINT UNSIGNED NOT NULL,
	weight SMALLINT UNSIGNED NOT NULL,
	
	PRIMARY KEY(eid),
	FOREIGN KEY(wid)
		REFERENCES Workouts(wid)
);