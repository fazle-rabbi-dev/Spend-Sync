import { ID, Query } from "appwrite";
import { appwriteConfig, account, databases, storage, avatars } from "./config";
import { v4 as uuidv4 } from 'uuid';
const SOCIAL_AUTH_SUCCESS_URL = import.meta.env.VITE_SOCIAL_AUTH_SUCCESS_URL
const SOCIAL_AUTH_FAILURE_URL = import.meta.env.VITE_SOCIAL_AUTH_FAILURE_URL

const displayError = (msg, error) => {
  console.log(`@ Error occured while ${msg}. Cause: ${error}`);
};


// =====================================================================================================================
// <====== AUTHENTICATION ======>
// =====================================================================================================================

// Create User Account
export async function createUserAccount(user) {
  if (!user) {
    throw Error;
  }

  try {
    const existingUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("email", user.email)]
    );
    
    if(existingUser.total > 0) throw new Error("Email already exists");
    
    const newAccount = await account.create(ID.unique(), user.email, user.password, user.name);

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);
    
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      avatarUrl
    });

    return newUser;
  } catch (error) {
    displayError("creating user account", error);
    return error;
  }
}

// Save User To Db After Auth
export async function saveUserToDB(user) {
  try {
    const newUser = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, ID.unique(), user);
    
    if (!newUser) throw Error;

    return newUser;
  } catch (error) {
    displayError("saving user to db", error);
    return error;
  }
}

// Save user to db after social auth
export async function saveUserAfterSocialAuth() {
  try {
    const loggedinAccount = await getAccount();
    
    if(!loggedinAccount) throw Error;
    
    const existingUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", loggedinAccount.$id)]
    );
    
    if(existingUser.total > 0) return { ok: true, user: existingUser };
    
    const avatarUrl = avatars.getInitials(loggedinAccount.name);

    const newUser = await saveUserToDB({
      accountId: loggedinAccount.$id,
      name: loggedinAccount.name,
      email: loggedinAccount.email,
      avatarUrl
    });
    
    if(!newUser) throw Error;
    
    return {
      ok: true,
      user: newUser
    };
  } catch (error) {
    displayError("saving user account in db after github auth", error)
    return error;
  }
}

// Sign In & Sign Out Account
export async function signInAccount(user) {
  try {
    const session = await account.createEmailSession(user.email, user.password);

    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
  }
}

// Sign in with github
export async function signInWithGithub() {
  try {
    account.createOAuth2Session('github', `${SOCIAL_AUTH_SUCCESS_URL}&source=github`, `${SOCIAL_AUTH_FAILURE_URL}&source=github` );
  } catch (error) {
    displayError("signing in with github")
  }
}

// Sign in with google
export async function signInWithGoogle() {
  try {
    account.createOAuth2Session('google', `${SOCIAL_AUTH_SUCCESS_URL}&source=google`, `${SOCIAL_AUTH_FAILURE_URL}&source=google` );
  } catch (error) {
    displayError("signing in with google")
  }
}

// Get Loggedin Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

// Get logged in account details from users collection
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [
      Query.equal("accountId", currentAccount.$id)
    ]);

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}



// =====================================================================================================================
// <====== EXPENSE CRUD OPERATION ======>
// =====================================================================================================================

export async function createExpense (newExpense) {
  try {
    const createdExpense = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.expenseCollectionId,
        ID.unique(),
        newExpense
      )
    
    if(!createdExpense) throw Error;
    
    return createdExpense;
  } catch (error) {
    displayError("creating expense", error)
  }
}

// =====================================================================================================================
// Update Expense
// =====================================================================================================================
export async function updateExpense ({ newData, originalData, owner }) {
  try {
    const existingDoc = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.expenseCollectionId,
        [
          Query.equal("owner", owner)
        ]
      )
    
    if(existingDoc?.total === 0) throw Error;
    
    const updatedExpense = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.expenseCollectionId,
        originalData.$id,
        {
          ...newData
        }
      )
    
    if(!updatedExpense) throw Error;
    
    return updatedExpense;
  } catch (error) {
    displayError("updating expense", error)
  }
}

// =====================================================================================================================
// Get All Expenses
// =====================================================================================================================
export async function getExpenses({ userId, forToday=false }) {
  try {
    const filters = [
      Query.equal("owner", userId),
      Query.equal("isTrashed", false)
    ];

    if (forToday) {
      console.log("ok")
      const today = new Date().toISOString().split('T')[0]; // Get today's date in ISO format
      filters.push(Query.equal("date", `${today}`));
    }

    const expenses = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.expenseCollectionId,
      filters
    );

    return expenses?.documents.reverse();
  } catch (error) {
    displayError("getting all expenses.");
    return [];
  }
}

// =====================================================================================================================
// Get All Trashed Expenses
// =====================================================================================================================
export async function getTrashedExpenses (owner) {
  try {
    const expenses = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.expenseCollectionId,
        [
          Query.equal("owner", owner),
          Query.equal("isTrashed", true)
        ]
      )
    
    return expenses?.documents.reverse();
  } catch (error) {
    displayError("getting all expenses.")
  }
}

// =====================================================================================================================
// Move To Trash Expense
// =====================================================================================================================
export async function moveToTrashExpense ({ deleteItem, owner }) {
  try {
    const expense = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.expenseCollectionId,
        deleteItem?.$id
      )
    
    if(!expense) throw Error;
    
    if(expense?.owner.$id !== owner) throw Error;
    
    const res = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.expenseCollectionId,
        expense.$id,
        {
          isTrashed: true
        }
      )
    
    return { ok: true }
  } catch (error) {
    displayError("deleting expense.", error)
  }
}

// =====================================================================================================================
// Restore Expense From Trash
// =====================================================================================================================
export async function restoreExpenseFromTrash ({ trashedItem, owner }) {
  try {
    const expense = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.expenseCollectionId,
        trashedItem?.$id
      )
    
    if(!expense) throw Error;
    
    if(expense?.owner.$id !== owner) throw Error;
    
    const res = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.expenseCollectionId,
        expense.$id,
        {
          isTrashed: false
        }
      )
    
    return { ok: true }
  } catch (error) {
    displayError("restoring expense.", error)
  }
}

// =====================================================================================================================
// Permanently Delete Expense
// =====================================================================================================================
export async function deleteExpense ({ deleteItem, owner }) {
  try {
    console.log(deleteItem?.$id)
    
    const expense = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.expenseCollectionId,
        deleteItem?.$id
      )
    
    
    
    if(!expense) throw Error;
    
    if(expense?.owner.$id !== owner) throw Error;
    
    const res = await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.expenseCollectionId,
        expense.$id
      )
    
    return { ok: true }
  } catch (error) {
    displayError("deleting expense.", error)
  }
}

