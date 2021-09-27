/**
 * This is a port of the Go code from https://github.com/hdevalence/ed25519consensus
 * which is an extension of https://github.com/golang/crypto/tree/master/ed25519
 * which is in turn a port of the “ref10” implementation of ed25519 from SUPERCOP.
 */
import bigInt from "big-integer";
import { FieldElement } from "./fieldElement";
import { PreComputedGroupElement } from "./preComputedGroupElement";
export declare const CONST_D: FieldElement;
export declare const CONST_D2: FieldElement;
export declare const CONST_SQRT_M1: FieldElement;
export declare const CONST_A: FieldElement;
export declare const CONST_ORDER: bigInt.BigInteger[];
export declare const CONST_BI: PreComputedGroupElement[];
export declare const CONST_BASE: PreComputedGroupElement[][];
