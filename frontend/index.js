Ext.ns("Test");

const usersDataStore = Ext.create("Ext.data.Store", {
  data: [],

  // ### FIRST CASE is to use a fetched data store ###

  // proxy: {
  //   type: "ajax",
  //   url: "/api/users",
  //   reader: {
  //     type: "json",
  //     rootProperty: "users",
  //   },
  // },
  // autoLoad: false,
  // listeners: {
  //   load(records, successful, operation) {
  //     if (successful) {
  //       console.log("Data loaded successfully:", records);
  //     } else {
  //       console.error("Failed to load data:", operation.getError());
  //     }
  //   },
  // },
});

Ext.define("Test.UserList", {
  extend: "Ext.grid.Panel",
  renderTo: document.body,
  width: "100%",
  title: "Users",
  columns: [
    {
      text: "User Name",
      dataIndex: "name",
      flex: 1,
    },
    {
      text: "User Email",
      dataIndex: "email",
      flex: 1,
    },
  ],
  buttons: [
    {
      text: "load users",
      handler() {
        //your logic will be here;

        // ### FIRST CASE is to use a fetched data store ###

        // usersDataStore.load();

        // ### SECOND CASE is to use a button to dynamically update the store ###

        usersDataStore.removeAll();

        usersDataStore.setProxy({
          type: "ajax",
          url: "/api/users",
          reader: {
            type: "json",
            rootProperty: "users",
          },
        });

        usersDataStore.load({
          callback: (records, operation, success) => {
            if (success) {
              console.log("Data loaded successfully:", records);
            } else {
              console.error("Failed to load data:", operation.getError());
            }
          },
        });

      },
    },
  ],
  store: usersDataStore,
});

Ext.onReady(() => {
  Ext.create("Test.UserList");
});

/**
 * prerequisites:
 * to start this sample you'll need to have nodejs/npm installed on your machine.
 *
 * There is a simple backend which serves frontend and has a single api endpoint to load users `/api/users`
 * to start the sample
 * go to the whocpa-test directory and run
 * `npm install`
 * `npm start`
 *  in browser go to localhost:3000/index.html
 *
 * Main task is to understand how to use ExtJS Store and load data to it.
 * Please go through the docs and try to implement fetching data from the API and display it inside Grid.
 */
