const admin = require("firebase-admin");
const fs = require("fs");

// Load your service account key
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Load your questions from the JSON file
const data = JSON.parse(fs.readFileSync("Questions.json", "utf8"));

// Loop through each category (numeric, verbal, computer)
for (const [category, Questions] of Object.entries(data.Questions)) {
  Questions.forEach(async (q, index) => {
    try {
      await db.collection("Questions").add({ ...q, category }); // Add question with category
      console.log(`Added ${category} question ${index + 1}`);
    } catch (error) {
      console.error(`Error adding ${category} question ${index + 1}:`, error);
    }
  });
}
