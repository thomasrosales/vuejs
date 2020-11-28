import cats from '../data/cats';
import dogs from '../data/dogs';


// ESTADO POR DEFECTO DE LA APLICACION
export default {
    cats,
    dogs,
    pets: [...cats, ...dogs]
}
