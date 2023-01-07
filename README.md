# Issue with definePage from unplugin-vue-router package
The issue is in client/src/pages/rooms/index.vue and client/src/pages/rooms/[id].vue where I have the definePage macro calls.
With the ```<route>``` tag it works.
I added the auto-imports.d.ts to get rid of the import TypeScript error, but then I get a compile time error.
