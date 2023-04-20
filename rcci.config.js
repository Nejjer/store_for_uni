module.exports = {
    multiProject: false /* Enable searching projects with component folder path */,
    skipFinalStep: false /* Toggle final step agreement */,
    checkExistenceOnCreate: false /* Enable check folder for components which can be replaced */,
    folderPath: 'src/components' /* Destination path or array of paths to create components */,
    templatesFolder: 'templates' /* Folder with templates */,
    templates: [
        {
            name: 'component',
            files: {
                /* Component folder structure declaration */
                index: {
                    name: 'index.ts',
                    file: 'index.tmp'
                },
                component: {
                    name: '[name].tsx',
                    file: [
                        { name: 'fc.tmp', description: 'Functional component' },
                    ]
                },
                style: {
                    name: '[name].module.scss',
                    optional: true
                },
            }
        }
    ],
    placeholders: {
        /* Template placeholders */
        NAME: ({ componentName }) => componentName,
        COMPONENT_FILE_PREFIX: ({ filePrefix }) => filePrefix,
        STYLE: ({ files }) => (files.style ? `\nimport styles from './${files.style.name}';\n` : ''),
        STORY_PATH: ({ join, project, destinationFolder, componentName }) =>
            join(project, destinationFolder, componentName)
    }
};
