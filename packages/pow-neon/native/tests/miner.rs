use bee_pow::{
    providers::{
        miner::{MinerBuilder, MinerCancel},
        NonceProvider, NonceProviderBuilder,
    },
    score::compute_pow_score,
};
use bee_test::rand::bytes::rand_bytes;

#[test]
fn miner_provide() {
    let miner = MinerBuilder::new().with_num_workers(1).finish();
    let mut bytes: [u8; 28] = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0
    ];

    let nonce = miner.nonce(&bytes[0..20], 400f64).unwrap();
    bytes[20..].copy_from_slice(&nonce.to_le_bytes());

    assert!(compute_pow_score(&bytes) >= 400f64);
}