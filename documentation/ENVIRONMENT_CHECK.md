# Environment check (build sandbox)
Detected: OpenJDK/Javac 17.0.20.1, Git 2.45.4, Node 24.16.0/npm 11.18.0. System Maven and Docker are absent. Node/Docker are not required by this project.

A build attempt tried to fetch Maven 3.9.9 from Apache Archive, but the sandbox endpoint returned HTTP 403. Consequently Maven dependencies could not be installed and compilation/integration execution could not be truthfully completed in this sandbox. On a normal Windows machine, install Maven 3.9+ and run the documented `mvn clean test package` command.
