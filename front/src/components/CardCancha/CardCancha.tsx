"use client";
import { ICancha, ITurno } from "@/interface/ISedes";
import { FetchCanchaById } from "@/service/ApiGetCanchaById";
import { useState } from "react";

export const CardCancha = ({ cancha }: { cancha: ICancha }) => {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [canchaId, setCanchaId] = useState<ICancha>();

  const getCanchaById = async (id: string) => {
    const fetchCancha: ICancha = await FetchCanchaById(id);
    setCanchaId(fetchCancha);
  };

  const toggleOpen = async (id: string) => {
    setOpen(!open);

    if (!open) {
      await getCanchaById(id);
    }
  };

  const mouseEnter = () => {
    setHover(true);
  };
  const mouseLeave = () => {
    setHover(false);
  };
  return (
    <div
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      key={cancha.id}
      className={`${
        cancha.sport == 2
          ? "bg-blue-400 hover:text-blue-400 hover:border-blue-400"
          : cancha.sport == 3
          ? "bg-orange-500 hover:text-orange-500 hover:border-orange-500"
          : "bg-main hover:text-main hover:border-main"
      } hover:bg-terciario-white rounded-lg text-terciario-white border-2 border-terciario-white flex flex-col w-4/5 lg:w-3/5 p-2 ease-in-out duration-300`}
    >
      <div className="w-full flex flex-row">
        <div className="flex justify-center w-1/5 p-2">
          {cancha.sport === 1 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="140"
              height="140"
              viewBox="0 0 157 157"
              fill="none"
            >
              <path
                d="M156.197 78.1639C156.251 76.3057 156.741 49.7463 141.024 32.4571C140.325 30.9116 137.013 24.6829 126.322 17.0703C119.252 11.5062 111.876 7.57871 111.272 7.26336C111.267 7.26075 111.256 7.25554 111.251 7.25294C110.584 6.89589 97.5478 0 81.7258 0C80.5244 0 79.336 0.0703665 78.1606 0.151157V0.130308C66.0967 -0.132914 54.1136 2.97102 46.8919 6.23132C40.486 9.12416 33.3738 13.9742 32.8604 14.3495C23.989 19.3116 7.16629 39.2253 5.83454 49.7776C0.458041 56.65 -4.03497 87.52 5.84497 106.323C12.7721 132.455 38.8493 145.533 40.9238 146.536C42.1852 147.342 56.3966 156.127 73.8552 156.127C74.5876 156.127 79.0154 156.372 80.5948 156.372C99.4659 156.372 127.43 143.07 133.283 132.651C149.366 120.887 157.703 90.5692 156.197 78.1639ZM41.0672 117.42C33.5901 105.325 29.3291 89.5215 28.4169 85.8911C30.7833 82.3441 42.4563 65.1331 49.1072 59.9546C52.8731 60.6479 68.5986 63.5355 83.4303 66.2199C85.2937 71.0491 93.4692 92.357 95.8095 100.582C93.2294 103.642 83.0941 115.442 73.1151 124.684C62.5211 124.733 44.5021 118.622 41.0672 117.42ZM135.061 32.7855C135.03 33.9582 134.751 38.1281 132.754 42.9156C128.79 40.8906 118.827 36.554 105.171 35.8216C103.104 32.7698 95.3274 22.1289 83.0446 14.7482C84.7255 11.4593 87.0658 7.4484 88.4341 6.22611C88.8771 6.10101 89.5652 5.98634 90.6128 5.98634C97.1986 5.98634 108.577 10.2995 109.567 10.6826C110.618 11.2378 131.071 22.2514 135.061 32.7855ZM25.4693 83.4283C16.5485 81.9063 11.2449 79.1334 9.66038 78.1951C6.34274 66.1625 9.01406 53.1578 9.42583 51.2944C12.6992 45.441 22.0188 30.5207 28.1667 27.6878C34.5388 26.3873 42.4849 28.0032 45.7218 28.7928C45.4169 33.0018 44.8305 44.7608 46.5714 57.1009C39.5191 62.7771 28.357 79.1151 25.4693 83.4283ZM77.3631 3.98742C79.3647 4.13597 82.3018 4.57381 84.3138 5.17062C82.307 7.83932 80.2507 11.7955 79.2787 13.7501C75.187 14.4199 59.6465 17.3909 47.4549 25.2954C44.9973 24.6438 37.5749 22.9055 30.5461 23.5049C32.287 20.1352 34.888 17.6437 35.1668 17.3883C36.1337 16.695 54.7469 3.67208 77.3631 3.95354V3.98742ZM127.13 103.264C124.081 103.139 112.333 102.469 99.4503 99.4431C96.9823 90.8376 88.8328 69.6183 86.9694 64.7917C94.9599 53.3715 102.836 42.6133 105.025 39.6318C119.849 40.445 130.258 45.8527 132.272 46.9812C140.86 60.7912 142.744 74.8957 143.002 77.2517C138.441 91.4448 129.421 101.002 127.13 103.264ZM4.31255 69.1127C4.53147 72.4121 5.06052 75.8861 6.01697 79.321C5.13609 81.5701 4.56535 83.9052 4.23958 86.2299C3.6558 80.3374 3.76265 74.3875 4.31255 69.1127ZM29.4463 129.99C33.3764 126.203 38.2213 122.518 40.1003 121.126C44.3483 122.622 61.794 128.52 72.9144 128.52C74.8091 131.061 81.0039 139.018 88.5983 145.1C83.8707 149.726 77.0426 151.91 75.8359 152.273C54.6557 152.841 34.028 140.936 29.4463 129.99ZM85.3823 152.241C87.7852 150.842 90.2897 148.999 92.3616 146.667C95.7417 146.2 110.248 143.704 123.357 134.074C124.222 134.168 125.647 134.282 127.24 134.238C119.374 141.944 100.183 150.552 85.3823 152.241ZM125.58 130.412C130.289 118.142 130.088 108.89 129.856 105.935C132.442 103.402 141.313 93.9494 146.236 79.579C148.889 80.0221 150.614 80.6971 151.433 81.075C151.717 82.1174 152.191 84.5255 151.923 88.1767C149.916 101.32 142.989 121.014 130.854 129.721C129.635 130.344 127.487 130.48 125.58 130.412Z"
                fill="black"
              />
            </svg>
          ) : cancha.sport === 2 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="140"
              height="140"
              viewBox="0 0 157 157"
              fill="none"
            >
              <path
                d="M138.896 17.3686C122.739 1.21186 85.4745 -13.6419 50.034 21.538C26.5807 44.7307 18.2417 74.1777 50.034 105.97C81.8262 137.502 111.273 129.163 134.726 105.97C170.167 70.5294 155.053 33.5253 138.896 17.3686Z"
                fill="#000"
              />
              <path
                d="M75.0508 123.169L32.8349 80.9531C32.8349 80.9531 41.695 101.54 26.5807 116.915C26.5807 116.915 13.8117 129.684 0.260864 141.411C1.82442 144.538 1.30323 144.798 6.77567 150.531C11.4663 155.222 11.7269 154.701 14.3328 156.264C26.0595 142.453 39.0891 129.423 39.0891 129.423C54.464 114.309 75.0508 123.169 75.0508 123.169Z"
                fill="#3E4347"
              />
              <path
                opacity="0.5"
                d="M14.5932 155.743C23.1927 145.841 32.574 136.199 36.7435 132.029L59.415 107.533L48.4701 96.5886L23.9745 119.26C19.5444 123.43 9.9025 132.811 0 141.41C1.56355 144.538 1.04237 144.798 6.5148 150.531C11.2055 155.222 11.4661 154.701 14.072 156.264L14.5932 155.743Z"
                fill="#000"
              />
              <path
                d="M10.1628 153.919C11.7264 155.222 12.5082 155.482 14.0717 156.264C14.3323 156.004 14.3323 156.004 14.5929 156.004C23.1924 146.101 32.5738 136.459 36.7432 132.29L59.4148 107.794L53.1605 111.442L10.1628 153.919Z"
                fill="#000"
              />
              <path
                d="M75.0503 123.169L59.4147 107.534L38.3068 130.205C42.4762 126.036 55.2452 116.394 75.0503 123.169ZM32.8343 80.9531L48.4699 96.5887L25.7983 117.697C29.9678 113.267 39.6097 100.758 32.8343 80.9531Z"
                fill="#3E4347"
              />
              <path
                d="M135.768 156.264C147.138 156.264 156.355 147.047 156.355 135.677C156.355 124.308 147.138 115.091 135.768 115.091C124.399 115.091 115.182 124.308 115.182 135.677C115.182 147.047 124.399 156.264 135.768 156.264Z"
                fill="#000"
              />
              <path
                d="M150.101 127.86C149.058 129.944 144.889 129.944 140.98 127.86C137.071 125.775 134.465 122.387 135.508 120.563C136.55 118.478 140.72 118.478 144.628 120.563C148.798 122.648 151.143 125.775 150.101 127.86Z"
                fill="#000"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="140"
              height="140"
              viewBox="0 0 157 157"
              fill="none"
            >
              <path
                d="M145.069 14.3496C127.219 -3.4974 94.5695 0.205946 72.1539 22.6293C59.0162 35.7644 52.3575 52.3943 52.639 67.5204C51.5809 83.7203 48.6776 99.3547 41.0129 108.419L38.3624 105.766L34.2734 109.852L35.407 110.986L7.91467 138.478L6.781 137.345L2.69714 141.428L17.6304 156.37L21.7195 152.286L20.5858 151.155L48.0808 123.662L49.2145 124.793L53.2957 120.71L51.0101 118.411C60.0691 110.751 75.6826 107.851 91.8669 106.785C106.998 107.079 123.644 100.423 136.792 87.2751C159.223 64.8517 162.924 32.2018 145.069 14.3496ZM148.149 43.463L144.402 39.7205L147.31 36.8173C147.782 38.9752 148.058 41.1956 148.149 43.463ZM146.098 32.5953L141.689 37.0075L133.417 28.733L139.979 22.168C142.7 25.2485 144.733 28.7694 146.098 32.5953ZM69.9751 70.1761L80.3529 59.7932L88.6326 68.0703L78.2497 78.4481L69.9751 70.1761ZM75.5393 81.1741L68.9639 87.7416C66.2405 84.6559 64.2051 81.1376 62.8447 77.3066L67.2569 72.8995L75.5393 81.1741ZM109.32 30.8335L119.693 20.4558L127.967 28.7356L117.587 39.1159L109.32 30.8335ZM125.862 52.8243L115.476 63.2281L107.191 54.9561L117.587 44.555L125.862 52.8243ZM114.869 41.8341L104.473 52.2301L96.1983 43.9555L106.594 33.557L114.869 41.8341ZM101.752 54.9561L91.3535 65.3521L83.0737 57.0723L93.4749 46.6764L101.752 54.9561ZM93.4749 41.2347L85.2212 32.9784L95.6171 22.5798L103.866 30.8335L93.4749 41.2347ZM90.7567 43.9581L80.3529 54.3515L72.1018 46.0952L82.4925 35.694L90.7567 43.9581ZM91.3535 70.7964L99.6254 79.0657L89.2477 89.4486L80.9783 81.1689L91.3535 70.7964ZM94.0821 68.0703L104.473 57.6744L112.747 65.9489L102.344 76.3475L94.0821 68.0703ZM115.476 68.6671L123.717 76.9261L113.318 87.322L105.059 79.0657L115.476 68.6671ZM118.189 65.9463L128.585 55.5503L136.844 63.804L126.448 74.2026L118.189 65.9463ZM120.31 41.8367L130.693 31.4538L138.965 39.7231L128.595 50.1061L120.31 41.8367ZM137.261 19.4472L130.693 26.0147L122.411 17.735L126.818 13.328C130.654 14.6858 134.175 16.7238 137.261 19.4472ZM122.599 12.1083L119.695 15.0115L115.956 11.2717C118.223 11.3655 120.443 11.6392 122.599 12.1083ZM110.634 11.3916L116.972 17.7324L106.597 28.1127L98.3354 19.859L106.209 11.9858C107.691 11.7121 109.169 11.5167 110.634 11.3916ZM98.7576 13.9951L95.6197 17.1382L94.2828 15.8012C95.7631 15.1236 97.2564 14.5242 98.7576 13.9951ZM90.6628 17.6203L92.8937 19.8538L82.4925 30.255L78.6328 26.3848C82.3883 22.8587 86.4461 19.932 90.6628 17.6203ZM75.9094 29.1109L79.7769 32.9784L69.3783 43.3744L67.1448 41.1383C69.4565 36.9215 72.3832 32.8689 75.9094 29.1109ZM65.3231 44.7608L66.6575 46.0978L63.5145 49.2408C64.0409 47.7345 64.6403 46.2437 65.3231 44.7608ZM61.5051 56.684L69.3783 48.8134L77.6346 57.0697L67.2569 67.4448L60.9083 61.0989C61.036 59.6394 61.2315 58.1643 61.5051 56.684ZM64.5309 70.1735L61.6276 73.0768C61.1533 70.9241 60.8849 68.6984 60.7936 66.4337L64.5309 70.1735ZM53.3921 106.037C50.541 103.186 54.2522 92.1356 56.8219 85.5655C58.6045 89.2115 60.9109 92.5995 63.8637 95.5523C66.8191 98.5077 70.2097 100.817 73.8635 102.602C67.2934 105.169 56.2381 108.883 53.3921 106.037ZM71.6848 90.4651L78.2523 83.8949L86.5269 92.1721L82.1094 96.5791C78.2862 95.2187 74.7653 93.1833 71.6848 90.4651ZM86.3392 97.7936L89.2451 94.8877L92.9875 98.6328C90.7176 98.5415 88.4971 98.2679 86.3392 97.7936ZM98.3119 98.5129L91.9633 92.1643L102.341 81.7865L110.603 90.0402L102.727 97.9213C101.249 98.1949 99.7766 98.3878 98.3119 98.5129ZM110.175 95.9119L113.316 92.7715L114.655 94.1059C113.172 94.7809 111.679 95.3829 110.175 95.9119ZM118.286 92.2763L116.052 90.0402L126.448 79.6469L130.313 83.5118C126.557 87.0379 122.502 89.9673 118.286 92.2763ZM133.034 80.791L129.166 76.9261L139.562 66.5275L141.801 68.761C139.487 72.9751 136.563 77.0329 133.034 80.791ZM143.62 65.141L142.283 63.8066L145.423 60.6662C144.897 62.1674 144.298 63.6607 143.62 65.141ZM147.435 53.21L139.562 61.0858L131.311 52.8243L141.689 42.4466L148.032 48.7952C147.904 50.2598 147.712 51.7323 147.435 53.21Z"
                fill="black"
              />
              <path
                d="M28.6677 57.3355C36.3246 57.3355 43.5255 54.354 48.9411 48.9411C54.3567 43.5255 57.3355 36.3246 57.3355 28.6677C57.3355 21.0109 54.3488 13.81 48.9332 8.39704C43.5202 2.98405 36.322 0 28.6651 0C21.0082 0 13.8126 2.98145 8.39965 8.39704C2.98405 13.81 0 21.0109 0 28.6677C0 36.3246 2.98145 43.5281 8.39704 48.9411C13.8126 54.354 21.0109 57.3355 28.6677 57.3355ZM45.5583 11.7772C49.9053 16.1243 52.3473 21.8526 52.5245 27.9693C46.6763 27.7087 40.9011 25.3553 36.4445 20.8962C31.9828 16.4396 29.6294 10.6644 29.3714 4.81358C35.4829 4.99079 41.2138 7.43277 45.5583 11.7772ZM11.7772 11.7746C15.762 7.78981 20.9066 5.39475 26.4473 4.88655C26.7262 11.4645 29.3532 17.9616 34.3648 22.9707C39.3765 27.9823 45.8762 30.6093 52.4516 30.8882C51.946 36.4315 49.5483 41.5761 45.5609 45.5609C41.5787 49.5431 36.4315 51.9407 30.8882 52.4489C30.6119 45.8736 27.9797 39.3765 22.9707 34.3674C17.959 29.3558 11.4671 26.7262 4.88915 26.4499C5.39214 20.904 7.78981 15.7594 11.7772 11.7746ZM20.8936 36.4393C25.3527 40.8985 27.7061 46.6737 27.9667 52.5219C21.85 52.3447 16.1217 49.9053 11.7746 45.5609C7.43016 41.2164 4.98819 35.4855 4.81358 29.3688C10.6618 29.6294 16.437 31.9828 20.8936 36.4393Z"
                fill="black"
              />
            </svg>
          )}
        </div>
        <div className="w-3/5 flex flex-col h-auto items-center justify-evenly">
          <h1 className="font-Marko font-bold uppercase text-3xl p-2">
            {cancha.name}
          </h1>
          <div className="flex flex-row p-2 w-full justify-evenly">
            <h2>Reserva: ${cancha.price} </h2>
            <h2>Jugadores: {cancha.player} </h2>
            <h2>Techado: {cancha.techado ? "Sí" : "No"} </h2>
          </div>
        </div>
        <div className="w-1/5 flex justify-center items-center">
          <button onClick={() => toggleOpen(cancha.id)}>
            {!open ? (
              <svg
                className={`duration-300 ease-in-out hover:cursor-pointer ${
                  hover && cancha.sport == 1
                    ? "fill-main"
                    : hover && cancha.sport == 2
                    ? "fill-blue-400"
                    : hover && cancha.sport == 3
                    ? "fill-orange-500"
                    : "fill-terciario-white"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="23"
                viewBox="0 0 40 23"
              >
                <path d="M20 23L0 2.99995L2.8 0.199951L20 17.4L37.2 0.199951L40 2.99995L20 23Z" />
              </svg>
            ) : (
              <svg
                className={`duration-300 ease-in-out hover:cursor-pointer ${
                  hover && cancha.sport == 1
                    ? "fill-main"
                    : hover && cancha.sport == 2
                    ? "fill-blue-400"
                    : hover && cancha.sport == 3
                    ? "fill-orange-500"
                    : "fill-terciario-white"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="23"
                viewBox="0 0 40 23"
                style={{ transform: "rotate(180deg)" }}
              >
                <path d="M20 23L0 2.99995L2.8 0.199951L20 17.4L37.2 0.199951L40 2.99995L20 23Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {open && (
        <div className="h-fit p-4 flex flex-col space-y-4">
          {canchaId?.turnos?.map((turno: ITurno) => {
            return (
              <div
                key={turno.id}
                className={`w-full min-h-[5vh] border-2 rounded-lg flex flex-row items-center justify-evenly ${
                  hover && cancha.sport == 1
                    ? "text-main border-main hover:bg-main hover:text-terciario-white"
                    : "text-terciario-white border-terciario-white"
                }`}
              >
                <p>{turno.date} </p>
                <p>{turno.time} </p>
                <p className="capitalize">{turno.status} </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default CardCancha;
