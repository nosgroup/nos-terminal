const {NFC} = require('nfc-pcsc');
const nfc = new NFC();

export class NfcTool {

    constructor(background) {
        this.background = background;
    }

    async killTheBuzzer(reader) {
        const packet = Buffer.from([
            0xff,
            0x00,
            0x52,
            0x00,
            0x00,
        ]);
        let response = null;

        response = await reader.control(packet, 2);
        reader.logger.debug('response received', response);

        const statusCode = response.readUInt16BE(0);

        if (statusCode !== 0x9000) {
            //throw new LoadAuthenticationKeyError(OPERATION_FAILED, `Load authentication key operation failed: Status code: ${statusCode}`);
        }

        console.log('[NosTerminal] The buzzer is dead');
    }

    listen() {
        nfc.on('reader', async reader => {
            try {
                await reader.connect('CONNECT_MODE_DIRECT');
                await this.killTheBuzzer(reader);
                await reader.disconnect();
            } catch (err) {
                console.log('err', err)
            }

            reader.on('card', async card => {

                try {
                    if (card.uid) {
                        await reader.led(0b00101110, [0x01, 0x01, 0x01, 0x01]);
                        this.background.sendToWindow(card.uid);
                    }
                } catch (ex) {
                    await reader.led(0b00101110, [0x01, 0x03, 0x03, 0x01]);
                }
            });

            reader.on('error', err => {
                console.log(`${reader.reader.name}  an error occurred`, err);
            });

            reader.on('end', () => {
            });

        });

        nfc.on('error', err => {
            console.log('an error occurred', err);
        });
    }

}