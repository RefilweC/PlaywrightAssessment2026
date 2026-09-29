const { execSync } = require('child_process');

const ports = [9323, 9324];

function run(command) {
  try {
    return execSync(command, { stdio: 'pipe', encoding: 'utf8' });
  } catch {
    return '';
  }
}

for (const port of ports) {
  const output = run(`netstat -ano | findstr :${port}`);
  if (!output) continue;

  const pids = [...new Set(output.match(/\d{1,5}/g) || [])];

  for (const pid of pids) {
    try {
      execSync(`taskkill /PID ${pid} /F`, { stdio: 'pipe' });
      console.log(`Stopped Playwright process ${pid} on port ${port}`);
    } catch {
      // Ignore if the process is already gone.
    }
  }
}
