/* Capa delgada sobre Heroicons, que es la libreria que fija el design system.
 *
 * Existe como capa y no como imports sueltos por dos razones: los nueve
 * componentes siguen pidiendo `IconoTelefono` sin saber de donde sale, y el
 * tamano y el `aria-hidden` se deciden en un solo lugar. Cambiar de libreria
 * otra vez seria editar este archivo y ninguno mas.
 *
 * Los iconos son decorativos a proposito: el dato siempre esta escrito al lado,
 * asi que anunciarlos con lector de pantalla solo duplicaria.
 *
 * Dos excepciones que no salen de Heroicons, porque son de marca:
 * - WhatsApp, que Heroicons no trae porque no incluye logotipos.
 * - La cruz de DocTowers, que reemplazo a los tres iconos de las cajas de
 *   numeros el 10-ago.
 */

import {
  MagnifyingGlassIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  EnvelopeIcon,
  IdentificationIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  XMarkIcon,
  BuildingOffice2Icon,
  SparklesIcon,
  CpuChipIcon,
  PlusCircleIcon,
  EyeIcon,
  BeakerIcon,
  ShoppingBagIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline";

type Props = { className?: string };

const clase = (extra = "") => `size-5 shrink-0 ${extra}`;

export const IconoBuscar = ({ className }: Props) => (
  <MagnifyingGlassIcon className={clase(className)} aria-hidden />
);

export const IconoTelefono = ({ className }: Props) => (
  <PhoneIcon className={clase(className)} aria-hidden />
);

export const IconoUbicacion = ({ className }: Props) => (
  <MapPinIcon className={clase(className)} aria-hidden />
);

export const IconoReloj = ({ className }: Props) => (
  <ClockIcon className={clase(className)} aria-hidden />
);

export const IconoCorreo = ({ className }: Props) => (
  <EnvelopeIcon className={clase(className)} aria-hidden />
);

export const IconoCredencial = ({ className }: Props) => (
  <IdentificationIcon className={clase(className)} aria-hidden />
);

export const IconoFlecha = ({ className }: Props) => (
  <ArrowRightIcon className={clase(className)} aria-hidden />
);

export const IconoChevron = ({ className }: Props) => (
  <ChevronRightIcon className={clase(className)} aria-hidden />
);

/* El del `select`. Va como elemento y no como `background-image`: en un data
   URI el color se escribe a mano y no puede ser `currentColor`, asi que el
   chevron quedaba fuera del sistema de tokens y se desfasaba solo. */
export const IconoChevronAbajo = ({ className }: Props) => (
  <ChevronDownIcon className={clase(className)} aria-hidden />
);

export const IconoCerrar = ({ className }: Props) => (
  <XMarkIcon className={clase(className)} aria-hidden />
);

/* Los del hospital y la zona comercial, agregados el 13-ago. Salen de la misma
   libreria que los demas, asi que no desentonan al lado de ellos.

   La farmacia va con `PlusCircleIcon` y no con la cruz de DocTowers: la cruz es
   el isotipo de la marca y usarla para nombrar a un inquilino confundiria una
   cosa con la otra. */
export const IconoHospital = ({ className }: Props) => (
  <BuildingOffice2Icon className={clase(className)} aria-hidden />
);

export const IconoEstrella = ({ className }: Props) => (
  <SparklesIcon className={clase(className)} aria-hidden />
);

export const IconoEquipo = ({ className }: Props) => (
  <CpuChipIcon className={clase(className)} aria-hidden />
);

export const IconoRed = ({ className }: Props) => (
  <GlobeAmericasIcon className={clase(className)} aria-hidden />
);

export const IconoFarmacia = ({ className }: Props) => (
  <PlusCircleIcon className={clase(className)} aria-hidden />
);

export const IconoOptica = ({ className }: Props) => (
  <EyeIcon className={clase(className)} aria-hidden />
);

export const IconoLaboratorio = ({ className }: Props) => (
  <BeakerIcon className={clase(className)} aria-hidden />
);

export const IconoComercio = ({ className }: Props) => (
  <ShoppingBagIcon className={clase(className)} aria-hidden />
);

/* La cruz del logotipo, como icono. Es el mismo trazo de `public/img/cruz.svg`,
   pero aqui va inline y con `fill="currentColor"` por una razon concreta: el
   archivo trae el fill clavado en el teal de marca, que sobre blanco da 1.95:1
   y se ve lavado. Heredando el color del contenedor, en `text-icon-accent` da
   4.15:1 y ademas sirve sobre el navy del hero sin exportar otra version.

   Relleno, no trazo, asi que no lleva `stroke-width` como los de Heroicons. */
export const IconoCruz = ({ className }: Props) => (
  <svg className={clase(className)} viewBox="0 0 512 512" fill="currentColor" aria-hidden>
    <path d="M296.309 215.85H470.261C493.313 215.85 512 234.465 512 257.426V296.154H296.309V511H254.281C232.967 511 215.689 493.789 215.689 472.56V296.154H41.7833C18.707 296.154 0 277.52 0 254.534V215.85H215.689V1H296.309V215.85Z" />
  </svg>
);

/* Las redes, agregadas el 14-ago con las cuentas reales de DocTowers.
   Misma excepcion que WhatsApp: Heroicons no trae logotipos.

   Los dos van con el contenedor cuadrado redondeado del icono de aplicacion, y
   no con el glifo suelto. Es lo que los deja leerse como pareja: la "f" sola
   junto a la camara de Instagram serian dos cosas de distinto tamano optico.
   Trazo 1.5, igual que todos los de arriba. */
export const IconoFacebook = ({ className }: Props) => (
  <svg
    className={clase(className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    {/* El tallo cae en x=11.5 y la barra va de 9.75 a 14.25, o sea centrada en
        12, que es el centro de la caja. Con la version anterior la letra
        quedaba medio punto a la izquierda y se notaba al lado de Instagram,
        que si es simetrico. */}
    <path d="M15 7.75h-1.25a2.25 2.25 0 0 0-2.25 2.25v7" />
    <path d="M9.75 12.5h4.5" />
  </svg>
);

export const IconoInstagram = ({ className }: Props) => (
  <svg
    className={clase(className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="3.75" />
    <path d="M16.9 7.1h.01" />
  </svg>
);

/* La excepcion: Heroicons no incluye logotipos de marca. Dibujado con el mismo
   grosor de trazo (1.5) que el resto para que no desentone al lado de ellos. */
export const IconoWhatsapp = ({ className }: Props) => (
  <svg
    className={clase(className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M3.5 20.5 5 16.4A8.2 8.2 0 1 1 8.1 19.5l-4.6 1Z" />
    <path d="M9 9.5c.4 2.2 3.3 5.1 5.5 5.5l1-1.4 2 .9v1.2c-2.6.6-6.6-2.1-8.2-5.4L9 9.5Z" />
  </svg>
);
