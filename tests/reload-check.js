// ERRORs
// === ERROR: User Anmol-Baranwal: "socials" count does not match expected 3 4
// === ERROR: User DanielaaER: "links" count does not match expected 4 5
// === ERROR: User Brownei: "links" count does not match expected 3 4
// === ERROR: User BruceWangyq: "links" count does not match expected 5 6
//

(async () => {
  const start = 300;
  const finish = 350;
  const urlNewVersion = "http://localhost:3000"; // form-data branch
  const urlOldVersion = "http://localhost:3001"; // main branch

  const profilesReq = await fetch(`${urlNewVersion}/api/users`);
  const profiles = await profilesReq.json();
  console.log("TOTAL: ", profiles.length);

  counter = 0;
  await Promise.all(
    profiles.slice(start, finish).map(async (profile) => {
      counter++;
      const userLocal = await fetch(
        `${urlNewVersion}/api/users/${profile.username}`
      );
      const userLocalRes = await userLocal.json();

      const userProd = await fetch(
        `${urlOldVersion}/api/users/${profile.username}`
      );
      const userProdRes = await userProd.json();

      const collections = ["links", "socials", "events", "milestones", "tags"];
      collections.map((collection) => {
        const local = userLocalRes[collection].length;
        const prod = userProdRes[collection]
          ? userProdRes[collection].length
          : 0;
        if (local !== prod) {
          console.log(
            `=== ERROR: User ${userLocalRes.username}: "${collection}" count does not match expected`,
            local,
            prod
          );
        }

        console.log(
          `SUCCESS: User ${userLocalRes.username}: "${collection}" count does match expected`,
          local,
          prod
        );
      });

      const collection = "testimonials";
      const testimonialsLocal = userLocalRes[collection].filter(
        (item) => item.isPinned
      ).length;
      const testimonialsProd = userProdRes[collection]
        ? userProdRes[collection].length
        : 0;
      if (testimonialsLocal !== testimonialsProd) {
        console.log(
          `=== ERROR: User ${userLocalRes.username}: "${collection}" count does not match expected`,
          testimonialsLocal,
          testimonialsProd
        );
      }

      console.log(
        `SUCCESS: User ${userLocalRes.username}: "${collection}" count does match expected`,
        testimonialsLocal,
        testimonialsProd
      );

      return;
    })
  );

  console.log("DONE", counter);
})();
