import Utils from '../../lib/utils/utils.js'

test('utils.checksum should validate checksum', function() {
    const isValidChecksum = Utils.isValidChecksum('UYEEERFQYTPFAHIPXDQAQYWYMSMCLMGBTYAXLWFRFFWPYFOICOVLK9A9VYNCKK9TQUNBTARCEQXJHD9VYXOEDEOMRC')
    expect(isValidChecksum).toBe(true)
})
