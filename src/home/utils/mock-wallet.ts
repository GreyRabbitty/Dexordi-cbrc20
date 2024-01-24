import { type PublicKey, SecretKey } from "@cmdcode/crypto-utils";
import { Address, Script, Tap } from "@cmdcode/tapscript";

class MockWallet {
  public secret?: string;
  public seckey?: SecretKey;
  public pubkey?: PublicKey;
  public init_tapkey?: string;
  public init_cblock?: string;
  public fundingAddress?: string;
  public init_leaf?: string;
  public init_script?: any[];

  init() {
    this.secret =
      "3e0767fdb167904eb52c04ae4e9b32ecb8bd53712672f9c73e0f37230bb67093";
    this.seckey = new SecretKey(this.secret, { type: "taproot" });
    this.pubkey = this.seckey.pub;

    this.init_script = [this.pubkey, "OP_CHECKSIG"];
    this.init_leaf = Tap.tree.getLeaf(Script.encode(this.init_script));
    const [init_tapkey, init_cblock] = Tap.getPubKey(this.pubkey, {
      target: this.init_leaf,
    });
    this.init_tapkey = init_tapkey;
    this.init_cblock = init_cblock;
    this.fundingAddress = Address.p2tr.encode(this.init_tapkey, "testnet");

    return this;
  }

  buf2hex(buffer: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return [...new Uint8Array(buffer)]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");
  }
}

export default MockWallet;
