Rahnama
===================
This is Rahnama. A supervisor simulator for students.

Setup Virtualenv
-------------
1. Install `virtualenvwrapper` package on your system.
2. Make the following virtualenv with python3:
```bash
mkvirtualenv rahnama
```
3. Everytime you need to work on the project use the following command:
```bash
workon rahnama
```

Installing Dependencies
-------------
When you're in the virtualenv, install python dependencies:
```bash
pip install -r requirements.txt
```

Migrations
-------------
If it's your first use, run migrations to build the database:
```bash
./manage.py migrate
```

Development Use
-------------
To run a development environment run:
```bash
./manage.py runserver
```
Then open your browser at `http://localhost:8000`
