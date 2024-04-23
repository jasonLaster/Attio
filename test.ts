import fs from "fs";
import sdk from "@api/attio";
// import users from "./users.json";
// const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
// const test = JSON.parse(fs.readFileSync("./test.json", "utf-8"));

require("dotenv")

const token = process.env.attio_key;



sdk.auth(token);

// (async () => {
//   const res = await sdk.postV2ObjectsCompaniesRecordsQuery();
//   fs.writeFileSync("test.json", JSON.stringify(res, null, 2));
// })();

async function fetchCompanies() {
  const res = await sdk.postV2ObjectsCompaniesRecordsQuery({});
  fs.writeFileSync(
    "./out/companies.json",
    JSON.stringify(res.data.data, null, 2)
  );
}

async function createCompany(name: string, domain: string) {
  const res = await sdk.postV2ObjectsCompaniesRecords({
    data: {
      values: {
        name: [{ value: name }],
        domains: [{ domain: domain }],
      },
    },
  });
  console.log(res);
}

async function deleteCompany(id: string) {
  const res = await sdk.deleteV2ObjectsCompaniesRecordsRecord_id({
    record_id: id,
  });
  console.log(res);
}

async function assertUser(email: string, name: string, last_session: string) {
  // convert jon@foo to jon%40foo
  const attr = email.replace("@", "%40");
  //   turn April 19, 2024, 1:19 PM into an iso string
  const last_session_iso = new Date(last_session).toISOString();
  try {
    const res = await sdk.putV2ObjectsPeopleRecords(
      {
        data: {
          values: {
            email_addresses: [{ email_address: email }],
            name: [
              {
                full_name: name,
                first_name: name.split(" ")[0],
                last_name: name.split(" ")[1],
              },
            ],
            last_session: {
              value: new Date(last_session).toISOString(),
            },
          },
        },
      },
      { matching_attribute: "email_addresses" }
    );
    return res;
  } catch (e: any) {
    console.error(e.data);
  }
}

// console.log(test.data.data.map((d) => d.values.name[0]?.value));
// fetchCompanies();
// sdk
//   .postV2ObjectsCompaniesRecords({
//     data: {
//       values: { domains: [{ domain: "nike.com" }], name: [{ value: "Nike" }] },
//     },
//   })
//   .then(({ data }) => console.log(data))
//   .catch((err) => console.error(err));

// createCompany("Nike2", "nike2.com");
(async () => {
  //   const res = await createCompany("Nike3", "nike3.com");
  //   console.log(res);
  //   await deleteCompany("3db23152-96e1-42b2-abb4-a8b9309ff56f");
  //   const res = await assertUser("emmanuel.meric@bifrost.re");
  //   console.log(res);
  //   console.log(users);
  //   const user = users[0];

  for (const user of users) {
    const res = await assertUser(user.email, user.name, user.last_session);
    console.log(res);
  }

  //   const res = await assertUser(user.email, user.name, user.last_session);
  //   console.log(res);
})();
