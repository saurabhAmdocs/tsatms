# Setup
## Windows portability
1. Install a JDK (17 recommended) and verify `java -version` and `javac -version`.
2. Install Maven 3.9+ and verify `mvn -version`. Git is only needed if cloning rather than copying the ZIP.
3. Extract the project ZIP into a writable folder. Open PowerShell in the extracted `tsatms` folder.
4. Optional environment: `$env:PORT='8080'; $env:DB_URL='jdbc:h2:./data/tsatms'`.
5. Run `mvn clean test package`.
6. Run `java -jar target/tsatms.jar`.
7. Browse to `http://localhost:8080` and sign in with a demo account from README.

No Node.js, Python, Docker, or external DB is needed. Maven downloads Java dependencies on first build, so the first build requires repository/network access.
