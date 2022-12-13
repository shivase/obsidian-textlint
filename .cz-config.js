module.exports = {
  types: [
    { name: 'feat \t\t New feature', value: 'feat', title: 'Features' },
    { name: 'fix \t\t Bug fix', value: 'fix', title: 'Bug Fixes' },
    {
      name: 'test \t\t Add, update, or pass tests',
      value: 'test',
      title: 'Tests',
    },
    {
      name: 'refactor \t Refactor code',
      value: '️refactor',
      title: 'Code Refactoring',
    },
    { name: 'wrench \t Add or update configuration', value: 'config' },
    {
      name: 'style \t Add or update the UI and style files',
      value: 'style',
      title: 'Styles',
    },
    {
      name: 'docs \t\t Change Documentation',
      value: 'docs',
      title: 'Documentation',
    },
    {
      name: 'perf \t\t Improves performance',
      value: 'perf',
      title: 'Performance',
    },
    {
      name: 'security \t Fix or prevent security issue',
      value: 'security',
    },
    {
      name: 'chore \t Change build process, or add tool/library',
      value: 'chore',
      title: 'Chores',
    },
  ],
  skipQuestions: ['body', 'footer'],
  scopes: ['api', 'ui'],
  allowCustomScopes: true,
};
