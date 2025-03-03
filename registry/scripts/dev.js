const { spawn } = require('child_process');

const component = process.argv[2];

const runProcess = (cmd, args, name) => {
  console.log(`👀 Watching component: ${component} with ${name}...`);

  const process = spawn(cmd, args, { stdio: 'inherit', shell: true });

  process.on('error', (err) => {
    console.error(`❌ [${name}] Build failed:`, err);
  });

  process.on('close', (code) => {
    console.log(`✅ [${name}] Process exited with code ${code}`);
  });

  return process;
};

if (!component) {
  console.log('Watching all components...');
  spawn('npm', ['run', 'dev:all'], { stdio: 'inherit', shell: true });
} else {
  runProcess(
    'npx',
    [
      'postcss',
      `src/components/${component}/**/*.css`,
      '--base',
      `src/components/${component}`,
      '--dir',
      `ui/${component}`,
      '--watch'
    ],
    'PostCSS'
  );
  runProcess(
    'npx',
    ['babel', `src/components/${component}`, '--out-dir', `ui/${component}`, '--extensions', '.ts,.tsx', '--watch'],
    'Babel'
  );
  runProcess('tsc', ['--project', `src/components/${component}/tsconfig.component.json`, '--watch'], 'TypeScript');
}
