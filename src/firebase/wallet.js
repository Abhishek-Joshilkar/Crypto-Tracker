import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "./config";

/* CREATE WALLET */

export const createWallet = async (
  uid
) => {

  const walletRef = doc(
    db,
    "users",
    uid
  );

  const walletSnap =
    await getDoc(walletRef);

  if (!walletSnap.exists()) {

    await setDoc(walletRef, {
      balance: 10000,
    });
  }
};

/* GET BALANCE */

export const getWalletBalance =
  async (uid) => {

    const walletRef = doc(
      db,
      "users",
      uid
    );

    const snapshot =
      await getDoc(walletRef);

    if (snapshot.exists()) {

      return snapshot.data().balance;
    }

    return 0;
  };

/* UPDATE BALANCE */

export const updateWalletBalance =
  async (uid, newBalance) => {

    const walletRef = doc(
      db,
      "users",
      uid
    );

    await updateDoc(walletRef, {
      balance: newBalance,
    });
  };