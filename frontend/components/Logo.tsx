import { FC } from 'react'

interface Props {
  size?: 'small' | 'medium' | 'large'
}

const Logo: FC<Props> = ({ size = 'medium' }) => {
  if (size === 'small') {
    return (
      <svg width='150' height='75' viewBox='0 0 150 75' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d={'M39.7758 40.4258C39.7758 43.4154 39.3656 46.0495 38.5453 48.3281C37.7432 50.6068 36.4945 52.3841 34.7992 53.6602C33.1039 \
            54.918 30.9255 55.5469 28.2641 55.5469C26.7146 55.5469 25.3656 55.237 24.2172 54.6172C23.0687 53.9974 22.0753 53.1315 21.2367 \
            52.0195L20.8266 55H12.0219V13H21.8656V27.6016C22.6677 26.7448 23.5883 26.0794 24.6273 25.6055C25.6664 25.1133 26.8604 24.8672 \
            28.2094 24.8672C30.8891 24.8672 33.0766 25.5234 34.7719 26.8359C36.4854 28.1484 37.7432 29.9349 38.5453 32.1953C39.3656 34.4375 \
            39.7758 36.9896 39.7758 39.8516V40.4258ZM29.932 39.8516C29.932 38.5755 29.8318 37.4089 29.6312 36.3516C29.4307 35.276 29.0297 \
            34.4193 28.4281 33.7812C27.8448 33.125 26.9424 32.7969 25.7211 32.7969C23.8617 32.7969 22.5766 33.4167 21.8656 34.6562V45.8125C22.5948 \
            47.0521 23.8982 47.6719 25.7758 47.6719C27.0336 47.6719 27.9542 47.3802 28.5375 46.7969C29.1208 46.1953 29.4945 45.3477 29.6586 \
            44.2539C29.8409 43.1602 29.932 41.8841 29.932 40.4258V39.8516ZM17.1898 39.9883V40.3164C17.1898 40.2617 17.199 40.207 17.2172 \
            40.1523L17.1898 39.9883ZM51.1125 55H41.2414V13H51.1125V55ZM70.7617 25.4141H80.6328V55H71.418L71.1445 51.8828C70.2331 53.0312 \
            69.1302 53.9336 67.8359 54.5898C66.5417 55.2279 65.0742 55.5469 63.4336 55.5469C60.4987 55.5469 58.1107 54.6992 56.2695 53.0039C54.4466 \
            51.2904 53.5352 48.4831 53.5352 44.582V25.4141H63.3789V44.6367C63.3789 45.5664 63.6523 46.2956 64.1992 46.8242C64.7643 47.3529 65.6029 \
            47.6172 66.7148 47.6172C67.7357 47.6172 68.5651 47.4531 69.2031 47.125C69.8594 46.7969 70.3789 46.3503 70.7617 45.7852V25.4141ZM110.454 \
            40.4258C110.454 43.4154 110.044 46.0495 109.223 48.3281C108.421 50.6068 107.173 52.3841 105.477 53.6602C103.782 54.918 101.604 55.5469 \
            98.9422 55.5469C97.3927 55.5469 96.0437 55.237 94.8953 54.6172C93.7469 53.9974 92.7534 53.1315 91.9148 \
            52.0195L91.5047 55H82.7V13H92.5437V27.6016C93.3458 26.7448 94.2664 26.0794 95.3055 25.6055C96.3445 25.1133 97.5385 24.8672 \
            98.8875 24.8672C101.567 24.8672 103.755 25.5234 105.45 26.8359C107.164 28.1484 108.421 29.9349 109.223 32.1953C110.044 \
            34.4375 110.454 36.9896 110.454 39.8516V40.4258ZM100.61 39.8516C100.61 38.5755 100.51 37.4089 100.309 36.3516C100.109 35.276 99.7078 \
            34.4193 99.1062 33.7812C98.5229 33.125 97.6206 32.7969 96.3992 32.7969C94.5398 32.7969 93.2547 33.4167 92.5437 34.6562V45.8125C93.2729 \
            47.0521 94.5763 47.6719 96.4539 47.6719C97.7117 47.6719 98.6323 47.3802 99.2156 46.7969C99.799 46.1953 100.173 45.3477 100.337 \
            44.2539C100.519 43.1602 100.61 41.8841 100.61 40.4258V39.8516ZM87.868 39.9883V40.3164C87.868 40.2617 87.8771 40.207 87.8953 \
            40.1523L87.868 39.9883ZM110.334 39.9609C110.334 37.0625 110.88 34.4831 111.974 32.2227C113.068 29.944 114.681 28.1484 116.814 \
            26.8359C118.947 25.5234 121.572 24.8672 124.689 24.8672C127.843 24.8672 130.486 25.5234 132.619 26.8359C134.77 28.1484 136.383 29.944 \
            137.459 32.2227C138.552 34.4831 139.099 37.0625 139.099 39.9609V40.4805C139.099 43.3607 138.552 45.9401 137.459 48.2188C136.383 50.4974 \
            134.779 52.293 132.646 53.6055C130.513 54.8997 127.879 55.5469 124.744 55.5469C121.608 55.5469 118.965 54.8997 116.814 53.6055C114.681 \
            52.293 113.068 50.4974 111.974 48.2188C110.88 45.9401 110.334 43.3607 110.334 40.4805V39.9609ZM120.205 40.4805C120.205 42.5221 120.496 \
            44.2266 121.08 45.5938C121.681 46.9427 122.903 47.6172 124.744 47.6172C126.548 47.6172 127.752 46.9427 128.353 45.5938C128.955 44.2266 \
            129.255 42.5221 129.255 40.4805V39.9609C129.255 38.6484 129.128 37.4544 128.873 36.3789C128.636 35.2852 128.189 34.4193 127.533 \
            33.7812C126.877 33.125 125.929 32.7969 124.689 32.7969C123.486 32.7969 122.556 33.125 121.9 33.7812C121.262 34.4193 120.815 35.2852 \
            120.56 36.3789C120.323 37.4544 120.205 38.6484 120.205 39.9609V40.4805Z'}
          fill='url(#paint0_linear)'
        />
        <defs>
          <linearGradient id='paint0_linear' x1='74.7706' y1='18.635' x2='74.7706' y2='51.5337' gradientUnits='userSpaceOnUse'>
            <stop stopColor='#2E8DFF' />
            <stop offset='1' stopColor='#1663C0' />
          </linearGradient>
        </defs>
      </svg>
    )
  }
  if (size === 'medium') {
    return (
      <svg width='200' height='100' viewBox='0 0 200 100' fill='none' xmlns='http://www.w3.org/2000/svg'>
        {/* eslint-disable-next-line max-len */}
        <path d='M54.7117 54.2617C54.7117 58.1055 54.1844 61.4922 53.1297 64.4219C52.0984 67.3516 50.493 69.6367 48.3133 71.2773C46.1336 72.8945 43.3328 73.7031 39.9109 73.7031C37.9187 73.7031 36.1844 73.3047 34.7078 72.5078C33.2312 71.7109 31.9539 70.5977 30.8758 69.168L30.3484 73H19.0281V19H31.6844V37.7734C32.7156 36.6719 33.8992 35.8164 35.2352 35.207C36.5711 34.5742 38.1062 34.2578 39.8406 34.2578C43.2859 34.2578 46.0984 35.1016 48.2781 36.7891C50.4812 38.4766 52.0984 40.7734 53.1297 43.6797C54.1844 46.5625 54.7117 49.8438 54.7117 53.5234V54.2617ZM42.0555 53.5234C42.0555 51.8828 41.9266 50.3828 41.6687 49.0234C41.4109 47.6406 40.8953 46.5391 40.1219 45.7188C39.3719 44.875 38.2117 44.4531 36.6414 44.4531C34.2508 44.4531 32.5984 45.25 31.6844 46.8438V61.1875C32.6219 62.7812 34.2977 63.5781 36.7117 63.5781C38.3289 63.5781 39.5125 63.2031 40.2625 62.4531C41.0125 61.6797 41.493 60.5898 41.7039 59.1836C41.9383 57.7773 42.0555 56.1367 42.0555 54.2617V53.5234ZM25.6727 53.6992V54.1211C25.6727 54.0508 25.6844 53.9805 25.7078 53.9102L25.6727 53.6992ZM69.2875 73H56.5961V19H69.2875V73ZM94.5508 34.9609H107.242V73H95.3945L95.043 68.9922C93.8711 70.4688 92.4531 71.6289 90.7891 72.4727C89.125 73.293 87.2383 73.7031 85.1289 73.7031C81.3555 73.7031 78.2852 72.6133 75.918 70.4336C73.5742 68.2305 72.4023 64.6211 72.4023 59.6055V34.9609H85.0586V59.6758C85.0586 60.8711 85.4102 61.8086 86.1133 62.4883C86.8398 63.168 87.918 63.5078 89.3477 63.5078C90.6602 63.5078 91.7266 63.2969 92.5469 62.875C93.3906 62.4531 94.0586 61.8789 94.5508 61.1523V34.9609ZM145.584 54.2617C145.584 58.1055 145.056 61.4922 144.002 64.4219C142.97 67.3516 141.365 69.6367 139.185 71.2773C137.005 72.8945 134.205 73.7031 130.783 73.7031C128.791 73.7031 127.056 73.3047 125.58 72.5078C124.103 71.7109 122.826 70.5977 121.748 69.168L121.22 73H109.9V19H122.556V37.7734C123.587 36.6719 124.771 35.8164 126.107 35.207C127.443 34.5742 128.978 34.2578 130.712 34.2578C134.158 34.2578 136.97 35.1016 139.15 36.7891C141.353 38.4766 142.97 40.7734 144.002 43.6797C145.056 46.5625 145.584 49.8438 145.584 53.5234V54.2617ZM132.927 53.5234C132.927 51.8828 132.798 50.3828 132.541 49.0234C132.283 47.6406 131.767 46.5391 130.994 45.7188C130.244 44.875 129.084 44.4531 127.513 44.4531C125.123 44.4531 123.47 45.25 122.556 46.8438V61.1875C123.494 62.7812 125.17 63.5781 127.584 63.5781C129.201 63.5781 130.384 63.2031 131.134 62.4531C131.884 61.6797 132.365 60.5898 132.576 59.1836C132.81 57.7773 132.927 56.1367 132.927 54.2617V53.5234ZM116.545 53.6992V54.1211C116.545 54.0508 116.556 53.9805 116.58 53.9102L116.545 53.6992ZM145.429 53.6641C145.429 49.9375 146.132 46.6211 147.538 43.7148C148.945 40.7852 151.019 38.4766 153.761 36.7891C156.503 35.1016 159.878 34.2578 163.886 34.2578C167.941 34.2578 171.339 35.1016 174.081 36.7891C176.847 38.4766 178.921 40.7852 180.304 43.7148C181.71 46.6211 182.413 49.9375 182.413 53.6641V54.332C182.413 58.0352 181.71 61.3516 180.304 64.2812C178.921 67.2109 176.859 69.5195 174.116 71.207C171.374 72.8711 167.987 73.7031 163.956 73.7031C159.925 73.7031 156.527 72.8711 153.761 71.207C151.019 69.5195 148.945 67.2109 147.538 64.2812C146.132 61.3516 145.429 58.0352 145.429 54.332V53.6641ZM158.12 54.332C158.12 56.957 158.495 59.1484 159.245 60.9062C160.019 62.6406 161.589 63.5078 163.956 63.5078C166.277 63.5078 167.823 62.6406 168.597 60.9062C169.37 59.1484 169.757 56.957 169.757 54.332V53.6641C169.757 51.9766 169.593 50.4414 169.265 49.0586C168.96 47.6523 168.386 46.5391 167.542 45.7188C166.698 44.875 165.48 44.4531 163.886 44.4531C162.339 44.4531 161.144 44.875 160.3 45.7188C159.48 46.5391 158.905 47.6523 158.577 49.0586C158.273 50.4414 158.12 51.9766 158.12 53.6641V54.332Z' fill='url(#paint0_linear)' />
        <defs>
          <linearGradient id='paint0_linear' x1='99.6942' y1='24.8466' x2='99.6942' y2='68.7117' gradientUnits='userSpaceOnUse'>
            <stop stopColor='#2E8DFF' />
            <stop offset='1' stopColor='#1663C0' />
          </linearGradient>
        </defs>
      </svg>
    )
  }
  if (size === 'large') {
    return (
      <svg width='250' height='125' viewBox='0 0 250 125' fill='none' xmlns='http://www.w3.org/2000/svg'>
        {/* eslint-disable-next-line max-len */}
        <path d='M64.6156 68.0156C64.6156 73.1406 63.9125 77.6562 62.5062 81.5625C61.1312 85.4688 58.9906 88.5156 56.0844 90.7031C53.1781 92.8594 49.4437 93.9375 44.8812 93.9375C42.225 93.9375 39.9125 93.4062 37.9437 92.3438C35.975 91.2812 34.2719 89.7969 32.8344 87.8906L32.1312 93H17.0375V21H33.9125V46.0312C35.2875 44.5625 36.8656 43.4219 38.6469 42.6094C40.4281 41.7656 42.475 41.3438 44.7875 41.3438C49.3812 41.3438 53.1312 42.4688 56.0375 44.7188C58.975 46.9688 61.1312 50.0312 62.5062 53.9062C63.9125 57.75 64.6156 62.125 64.6156 67.0312V68.0156ZM47.7406 67.0312C47.7406 64.8438 47.5687 62.8438 47.225 61.0312C46.8812 59.1875 46.1937 57.7188 45.1625 56.625C44.1625 55.5 42.6156 54.9375 40.5219 54.9375C37.3344 54.9375 35.1312 56 33.9125 58.125V77.25C35.1625 79.375 37.3969 80.4375 40.6156 80.4375C42.7719 80.4375 44.35 79.9375 45.35 78.9375C46.35 77.9062 46.9906 76.4531 47.2719 74.5781C47.5844 72.7031 47.7406 70.5156 47.7406 68.0156V67.0312ZM25.8969 67.2656V67.8281C25.8969 67.7344 25.9125 67.6406 25.9437 67.5469L25.8969 67.2656ZM84.05 93H67.1281V21H84.05V93ZM117.734 42.2812H134.656V93H118.859L118.391 87.6562C116.828 89.625 114.938 91.1719 112.719 92.2969C110.5 93.3906 107.984 93.9375 105.172 93.9375C100.141 93.9375 96.0469 92.4844 92.8906 89.5781C89.7656 86.6406 88.2031 81.8281 88.2031 75.1406V42.2812H105.078V75.2344C105.078 76.8281 105.547 78.0781 106.484 78.9844C107.453 79.8906 108.891 80.3438 110.797 80.3438C112.547 80.3438 113.969 80.0625 115.062 79.5C116.188 78.9375 117.078 78.1719 117.734 77.2031V42.2812ZM185.778 68.0156C185.778 73.1406 185.075 77.6562 183.669 81.5625C182.294 85.4688 180.153 88.5156 177.247 90.7031C174.341 92.8594 170.606 93.9375 166.044 93.9375C163.387 93.9375 161.075 93.4062 159.106 92.3438C157.137 91.2812 155.434 89.7969 153.997 87.8906L153.294 93H138.2V21H155.075V46.0312C156.45 44.5625 158.028 43.4219 159.809 42.6094C161.591 41.7656 163.637 41.3438 165.95 41.3438C170.544 41.3438 174.294 42.4688 177.2 44.7188C180.137 46.9688 182.294 50.0312 183.669 53.9062C185.075 57.75 185.778 62.125 185.778 67.0312V68.0156ZM168.903 67.0312C168.903 64.8438 168.731 62.8438 168.387 61.0312C168.044 59.1875 167.356 57.7188 166.325 56.625C165.325 55.5 163.778 54.9375 161.684 54.9375C158.497 54.9375 156.294 56 155.075 58.125V77.25C156.325 79.375 158.559 80.4375 161.778 80.4375C163.934 80.4375 165.512 79.9375 166.512 78.9375C167.512 77.9062 168.153 76.4531 168.434 74.5781C168.747 72.7031 168.903 70.5156 168.903 68.0156V67.0312ZM147.059 67.2656V67.8281C147.059 67.7344 147.075 67.6406 147.106 67.5469L147.059 67.2656ZM185.572 67.2188C185.572 62.25 186.509 57.8281 188.384 53.9531C190.259 50.0469 193.025 46.9688 196.681 44.7188C200.337 42.4688 204.837 41.3438 210.181 41.3438C215.587 41.3438 220.119 42.4688 223.775 44.7188C227.462 46.9688 230.228 50.0469 232.072 53.9531C233.947 57.8281 234.884 62.25 234.884 67.2188V68.1094C234.884 73.0469 233.947 77.4688 232.072 81.375C230.228 85.2812 227.478 88.3594 223.822 90.6094C220.166 92.8281 215.65 93.9375 210.275 93.9375C204.9 93.9375 200.369 92.8281 196.681 90.6094C193.025 88.3594 190.259 85.2812 188.384 81.375C186.509 77.4688 185.572 73.0469 185.572 68.1094V67.2188ZM202.494 68.1094C202.494 71.6094 202.994 74.5312 203.994 76.875C205.025 79.1875 207.119 80.3438 210.275 80.3438C213.369 80.3438 215.431 79.1875 216.462 76.875C217.494 74.5312 218.009 71.6094 218.009 68.1094V67.2188C218.009 64.9688 217.791 62.9219 217.353 61.0781C216.947 59.2031 216.181 57.7188 215.056 56.625C213.931 55.5 212.306 54.9375 210.181 54.9375C208.119 54.9375 206.525 55.5 205.4 56.625C204.306 57.7188 203.541 59.2031 203.103 61.0781C202.697 62.9219 202.494 64.9688 202.494 67.2188V68.1094Z' fill='url(#paint0_linear)' />
        <defs>
          <linearGradient id='paint0_linear' x1='124.618' y1='31.0583' x2='124.618' y2='85.8896' gradientUnits='userSpaceOnUse'>
            <stop stopColor='#2E8DFF' />
            <stop offset='1' stopColor='#1663C0' />
          </linearGradient>
        </defs>
      </svg>
    )
  }
}

export default Logo
