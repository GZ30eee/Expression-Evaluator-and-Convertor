import { exec } from 'child_process';

async function clickMe() {
    // Execute the command in the child process
    exec("node NODE_MAIN/index.js", (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }  
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

    // Redirect to the specified URL
    window.location.href = "http://localhost:9000/home";
}

export default clickMe;
export { exec };
