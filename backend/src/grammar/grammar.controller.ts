import { Body, Controller, Post } from '@nestjs/common';
import LanguageToolApi from 'languagetool-api';

@Controller('grammar')
export class GrammarController {

    @Post()
    async checkGrammar(@Body('text') text: string) {
        console.log("Text", text)
        if (!text) {
        return { error: 'Text is required' };
        }
    
        return new Promise((resolve, reject) => {
            LanguageToolApi.check({ language: 'en-US', text }, (err, result) => {
                if (err) return reject(err);
                resolve(result.matches);
            });
        });
    }

}
