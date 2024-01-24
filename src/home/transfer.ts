import express, { Express, Request, Response } from "express";

import { inscribe } from "./utils/inscribe";
import { Buff } from "@cmdcode/buff-utils";
import config from "./config";
import MockWallet from "./utils/mock-wallet";

const mockWallet = new MockWallet();
mockWallet.init();

interface Transfer {
  tick:string,
  transferAmount:number
}


interface Transfer2 {
  tick:string,
  transferAmount:number,
  destination:string
}

const testFlag = true;

export const Transfer = async ({
  tick,
  transferAmount
}:Transfer)  => {

  // return "Tranfer function is running well!!";

    try {
      const marker = Buff.encode("ord");
      const mimetype = Buff.encode("text/plain");
      const actionType = Buff.encode(
        `cbrc-20:transfer:${tick}=${transferAmount}`
      );
      const imgdata = Buff.encode(transferAmount.toString());
  
      const script = [
        mockWallet.pubkey,
        "OP_CHECKSIG",
        "OP_0",
        "OP_IF",
        marker,
        "01",
        mimetype,
        "07",
        actionType,
        "OP_0",
        imgdata,
        "OP_ENDIF",
      ];
      const tx = await inscribe(script);
      console.log(`Tx: ${tx}`);
      return tx;
    } catch (error) {
      console.error(error);
    }
};

export const Transfer2 = async ({
  tick,
  transferAmount,
  destination
}:Transfer2)  => {

  // return "Tranfer function is running well!!";

    try {
      const marker = Buff.encode("ord");
      const mimetype = Buff.encode("text/plain");
      const actionType = Buff.encode(
        `cbrc-20:transfer:${tick}=${transferAmount}`
      );
      const imgdata = Buff.encode(transferAmount.toString());
  
      const script = [
        destination,
        "OP_CHECKSIG",
        "OP_0",
        "OP_IF",
        marker,
        "01",
        mimetype,
        "07",
        actionType,
        "OP_0",
        imgdata,
        "OP_ENDIF",
      ];
      const tx = await inscribe(script);
      console.log(`Tx: ${tx}`);
    } catch (error) {
      console.error(error);
    }
};
