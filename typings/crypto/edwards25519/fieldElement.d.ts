/**
 * Class for field element operations.
 * FieldElement represents an element of the field GF(2^255 - 19).  An element
 * t, entries t[0]...t[9], represents the integer t[0]+2^26 t[1]+2^51 t[2]+2^77
 * t[3]+2^102 t[4]+...+2^230 t[9].  Bounds on each t[i] vary depending on
 * context.
 */
export declare class FieldElement {
    /**
     * Field element size.
     */
    private static readonly FIELD_ELEMENT_SIZE;
    /**
     * The data for the element.
     */
    data: Int32Array;
    /**
     * Create a new instance of FieldElement.
     * @param values A set of values to initialize the array.
     */
    constructor(values?: Int32Array | number[]);
    /**
     * Calculates h = f * g
     * Can overlap h with f or g.
     *
     * Preconditions:
     * |f| bounded by 1.1*2^26,1.1*2^25,1.1*2^26,1.1*2^25,etc.
     * |g| bounded by 1.1*2^26,1.1*2^25,1.1*2^26,1.1*2^25,etc.
     *
     * Postconditions:
     * |h| bounded by 1.1*2^25,1.1*2^24,1.1*2^25,1.1*2^24,etc.
     *
     * Notes on implementation strategy:
     *
     * Using schoolbook multiplication.
     * Karatsuba would save a little in some cost models.
     *
     * Most multiplications by 2 and 19 are 32-bit precomputations;
     * cheaper than 64-bit postcomputations.
     *
     * There is one remaining multiplication by 19 in the carry chain;
     * one *19 precomputation can be merged into this,
     * but the resulting data flow is considerably less clean.
     *
     * There are 12 carries below.
     * 10 of them are 2-way parallelizable and vectorizable.
     * Can get away with 11 carries, but then data flow is much deeper.
     *
     * With tighter constraints on inputs, can squeeze carries into: number.
     * @param f The f element.
     * @param g The g element.
     */
    mul(f: FieldElement, g: FieldElement): void;
    /**
     * Combine the element.
     * @param h0 The h0 component.
     * @param h1 The h1 component.
     * @param h2 The h2 component.
     * @param h3 The h3 component.
     * @param h4 The h4 component.
     * @param h5 The h5 component.
     * @param h6 The h6 component.
     * @param h7 The h7 component.
     * @param h8 The h8 component.
     * @param h9 The h9 component.
     */
    combine(h0: bigint, h1: bigint, h2: bigint, h3: bigint, h4: bigint, h5: bigint, h6: bigint, h7: bigint, h8: bigint, h9: bigint): void;
    /**
     * FieldElement.square calculates h = f*f. Can overlap h with f.
     *
     * Preconditions:
     * |f| bounded by 1.1*2^26,1.1*2^25,1.1*2^26,1.1*2^25,etc.
     *
     * Postconditions:
     * |h| bounded by 1.1*2^25,1.1*2^24,1.1*2^25,1.1*2^24,etc.
     * @param f The f element.
     */
    square(f: FieldElement): void;
    /**
     * FieldElement.square calculates h = f*f. Can overlap h with f.
     *
     * Preconditions:
     * |f| bounded by 1.1*2^26,1.1*2^25,1.1*2^26,1.1*2^25,etc.
     *
     * Postconditions:
     * |h| bounded by 1.1*2^25,1.1*2^24,1.1*2^25,1.1*2^24,etc.
     * @param f The f element.
     * @returns The components.
     */
    internalSquare(f: FieldElement): {
        h0: bigint;
        h1: bigint;
        h2: bigint;
        h3: bigint;
        h4: bigint;
        h5: bigint;
        h6: bigint;
        h7: bigint;
        h8: bigint;
        h9: bigint;
    };
    /**
     * Square2 sets h = 2 * f * f.
     *
     * Can overlap h with f.
     *
     * Preconditions:
     * |f| bounded by 1.65*2^26,1.65*2^25,1.65*2^26,1.65*2^25,etc.
     *
     * Postconditions:
     * |h| bounded by 1.01*2^25,1.01*2^24,1.01*2^25,1.01*2^24,etc.
     * See fe_mul.c for discussion of implementation strategy.
     * @param f The f element.
     */
    square2(f: FieldElement): void;
    /**
     * Add the elements and store in this.
     * @param a The a element.
     * @param b The b element.
     */
    add(a: FieldElement, b: FieldElement): void;
    /**
     * Subtract the elements and store in this.
     * @param a The a element.
     * @param b The b element.
     */
    sub(a: FieldElement, b: FieldElement): void;
    /**
     * Populate from bytes.
     * @param bytes The bytes to populate from.
     */
    fromBytes(bytes: Uint8Array): void;
    /**
     * FieldElement.toBytes marshals h to s.
     * Preconditions:
     * |h| bounded by 1.1*2^25,1.1*2^24,1.1*2^25,1.1*2^24,etc.
     *
     * Write p=2^255-19; q=floor(h/p).
     * Basic claim: q = floor(2^(-255)(h + 19 2^(-25)h9 + 2^(-1))).
     *
     * Proof:
     * Have |h|<=p so |q|<=1 so |19^2 2^(-255) q|<1/4.
     * Also have |h-2^230 h9|<2^230 so |19 2^(-255)(h-2^230 h9)|<1/4.
     *
     * Write y=2^(-1)-19^2 2^(-255)q-19 2^(-255)(h-2^230 h9).
     * Then 0<y<1.
     *
     * Write r=h-pq.
     * Have 0<=r<=p-1=2^255-20.
     * Thus 0<=r+19(2^-255)r<r+19(2^-255)2^255<=2^255-1.
     *
     * Write x=r+19(2^-255)r+y.
     * Then 0<x<2^255 so floor(2^(-255)x) = 0 so floor(q+2^(-255)x) = q.
     *
     * Have q+2^(-255)x = 2^(-255)(h + 19 2^(-25) h9 + 2^(-1))
     * so floor(2^(-255)(h + 19 2^(-25) h9 + 2^(-1))) = q.
     * @param bytes The bytes to populate.
     */
    toBytes(bytes: Uint8Array): void;
    /**
     * Is the element negative.
     * @returns 1 if its negative.
     */
    isNegative(): number;
    /**
     * Is the value non zero.
     * @returns 1 if non zero.
     */
    isNonZero(): number;
    /**
     * Neg sets h = -f.
     *
     * Preconditions:
     * |f| bounded by 1.1*2^25,1.1*2^24,1.1*2^25,1.1*2^24,etc.
     *
     * Postconditions:
     * |h| bounded by 1.1*2^25,1.1*2^24,1.1*2^25,1.1*2^24,etc.
     */
    neg(): void;
    /**
     * Invert.
     * @param z The elemnt to invert.
     */
    invert(z: FieldElement): void;
    /**
     * Perform the pow 22523 calculate.
     * @param z The element to operate on.
     */
    pow22523(z: FieldElement): void;
    /**
     * Replace (f,g) with (g,g) if b == 1;
     * replace (f,g) with (f,g) if b == 0.
     *
     * Preconditions: b in {0,1}.
     * @param g The g element.
     * @param b The b value.
     */
    cMove(g: FieldElement, b: number): void;
    /**
     * Zero the values.
     */
    zero(): void;
    /**
     * Zero all the values and set the first byte to 1.
     */
    one(): void;
    /**
     * Clone the field element.
     * @returns The clones element.
     */
    clone(): FieldElement;
}
