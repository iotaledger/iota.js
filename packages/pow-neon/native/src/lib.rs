use neon::prelude::*;

use bee_pow::{
    providers::{
        miner::{MinerBuilder},
        NonceProvider, NonceProviderBuilder,
    },
};

fn do_pow(mut cx: FunctionContext) -> JsResult<JsArray> {
    let js_arr_handle: Handle<JsArrayBuffer> = cx.argument(0)?;
    let js_target_score = cx.argument::<JsNumber>(1)?.value();
    let js_num_threads = cx.argument::<JsNumber>(2)?.value();

    let buffer = cx.borrow(&js_arr_handle, |data| {
        data.as_slice::<u8>()
    });

    let miner = MinerBuilder::new().with_num_workers(js_num_threads as usize).finish();
    let nonce = miner.nonce(&buffer, js_target_score).unwrap();

    let js_array = JsArray::new(&mut cx, 2);

    let lo = cx.number(nonce as u32);
    let hi = cx.number((nonce >> 32) as u32);

    js_array.set(&mut cx, 0, lo)?;
    js_array.set(&mut cx, 1, hi)?;

    Ok(js_array)
}

register_module!(mut cx, {
    cx.export_function("doPow", do_pow)?;
    Ok(())
});

