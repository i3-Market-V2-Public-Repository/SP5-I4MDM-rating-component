import path, {dirname} from "path"
import swaggerJSDoc from 'swagger-jsdoc'
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const swaggerOpts = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title:'Manufacturing Pilot Rating Component API',
            version:'1.0.0',
            license: {
                name: 'Licensed Under EUPL-1.2',
                url: 'https://spdx.org/licenses/EUPL-1.2.html',
            },
        },
    },
    apis:[path.join(__dirname,'../routes/**.js')],
}

export var swaggerOptions ={
    customSiteTitle: "Rating Swagger UI",
    customfavIcon: "/favicon.ico",
    customCss: `.topbar-wrapper img {content:url(\'/i3-logo.png\'); height:80px; width:auto;}
                .swagger-ui .topbar { background-color: #BFEBBC }`
}

export default swaggerJSDoc(swaggerOpts);