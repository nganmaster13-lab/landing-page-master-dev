import React from 'react';
import db from '../data/db.json';

const badgeClass =
  'flex items-center gap-2.5 h-12 pl-3.5 pr-5 rounded-xl bg-ink text-paper hover:bg-black transition-colors';

export const StoreBadges: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a href={db.stores.appStore.url} target="_blank" rel="noopener noreferrer" className={badgeClass}>
        <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 170 170" aria-hidden="true">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.8-12-14.28-5.65-8.5-10.06-18.06-13.23-28.69-3.17-10.63-4.76-20.73-4.76-30.3 0-14.99 3.86-27.17 11.58-36.56 7.72-9.39 17.18-14.17 28.39-14.34 4.88 0 10.15 1.25 15.82 3.76 5.66 2.5 9.77 3.82 12.33 3.96 2.02-.27 6.2-1.68 12.56-4.22 6.35-2.54 11.75-3.72 16.21-3.55 12.75.76 22.84 5.34 30.26 13.73-11.02 6.64-16.42 15.8-16.2 27.48.22 9.07 3.7 16.73 10.45 22.97 6.74 6.24 14.85 9.78 24.32 10.61-2.17 6.6-4.67 12.97-7.5 19.1zM119.22 31.84c0-7.39 2.66-14.23 7.97-20.52 5.31-6.29 11.85-10.45 19.63-12.48.33 1.09.49 2.23.49 3.42 0 7.39-2.83 14.46-8.5 21.2-5.66 6.74-12.5 10.87-20.51 12.39-.22-1.3-.08-2.64.92-4.01z" />
        </svg>
        <span className="flex flex-col leading-none text-left">
          <span className="text-[10px] opacity-70">{db.stores.appStore.badgeLabel}</span>
          <span className="text-[17px] font-medium mt-0.5">App Store</span>
        </span>
      </a>

      <a href={db.stores.googlePlay.url} target="_blank" rel="noopener noreferrer" className={badgeClass}>
        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 512 512" aria-hidden="true">
          <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
        </svg>
        <span className="flex flex-col leading-none text-left">
          <span className="text-[10px] opacity-70 uppercase">{db.stores.googlePlay.badgeLabel}</span>
          <span className="text-[17px] font-medium mt-0.5">Google Play</span>
        </span>
      </a>
    </div>
  );
};
