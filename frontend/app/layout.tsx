import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Color_Emoji, Poppins } from "next/font/google";
import { BaseHeader } from "./components/BaseHeader";
import { BaseFooter } from "./components/BaseFooter";
import { FIX_EMOJI, TITLE, DESCRIPTION } from "./utils/constants";
import { useAtom } from "jotai";
import { Cursor } from "./components/Cursor";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: "700",
})

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  weight: "700",
})

const notoColorEmoji = Noto_Color_Emoji({
  subsets: ['emoji'],
  variable: '--font-noto-color-emoji',
  weight: "400",
})

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
    <html lang="ja" className={`${notoSansJP.variable} ${poppins.variable} ${notoColorEmoji.variable}`}>
      <head>
        <GoogleAnalytics />
      </head>
      <body className='font-sans fonr-sans-emoji font-bold tracking-wide'>
        <div className="min-h-screen w-[1128px] m-auto pt-[40px] pb-[140px]">
          { FIX_EMOJI.map((data, index) => (
            <span key={index} className={`animation-name-emoji ${data.duration} ${data.delay} animation-timing-linear animation-itteration-count-infinite fixed bottom-0 ${data.position} ${data.size} filter ${data.blur}`}>
              <span className={`inline-block ${data.rotate}`}>
                {data.emoji}
              </span>
            </span>
          ))}
          <Cursor />
          <BaseHeader />
          {children}
          <div className="fixed bottom-0 left-0 w-full">
            <BaseFooter />
          </div>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;