import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./config";

export const addPortfolioCoin =
  async (
    userId,
    coin,
    quantity,
    buyPrice
  ) => {

    const portfolioRef =
      collection(
        db,
        "users",
        userId,
        "portfolio"
      );

    await addDoc(
      portfolioRef,
      {
        coinId: coin.id,
        name: coin.name,
        image: coin.image,
        symbol: coin.symbol,
        quantity,
        buyPrice,
        current_price:
          coin.current_price,
        createdAt:
          serverTimestamp(),
      }
    );
  };

export const getPortfolioCoins =
  async (userId) => {

    const portfolioRef =
      collection(
        db,
        "users",
        userId,
        "portfolio"
      );

    const snapshot =
      await getDocs(
        portfolioRef
      );

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
  };

export const deletePortfolioCoin =
  async (
    userId,
    docId
  ) => {

    await deleteDoc(
      doc(
        db,
        "users",
        userId,
        "portfolio",
        docId
      )
    );
  };