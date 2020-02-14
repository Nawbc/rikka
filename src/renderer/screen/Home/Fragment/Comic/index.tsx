import React, { FC, useState, useEffect } from 'react';

import { Card, Nav, Foot, ScrollBar } from '@/components';
import { createComic, Areas, ComicKind, Years } from '@/api/halihali';
import { VideoListData } from '@/api/halihali/halihali.interface';
import { Pagination } from 'antd';

export const Comic: FC = function() {
  const [cards, setCards] = useState<VideoListData[]>([]);
  const [page, setPage] = useState(1);
  const [year, setYear] = useState(Years['全部']);
  const [area, setArea] = useState(Areas['日本']);
  const [kind, setKind] = useState(ComicKind['全部']);

  useEffect(() => {
    createComic({ action: 'acg', dect: '', id: '', page, year, area, kind }).then(val => {
      setCards(val);
    });
  }, [page, area, kind, year]);

  return (
    <ScrollBar>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          position: 'relative',
          marginTop: '40px',
          padding: '0 20px'
        }}
      >
        <Nav
          mainKind={ComicKind}
          onYear={num => {
            setYear(num);
          }}
          onKind={kd => {
            setKind(kd);
          }}
          onArea={ar => {
            setArea(ar);
          }}
          year={year}
          area={area}
          kind={kind}
        />
        {!!cards && cards.length !== 0
          ? cards.map((val, index) => {
              return (
                <Card
                  key={index}
                  imgSrc={val.thumbUrl}
                  url={val.url}
                  videoName={val.title}
                  subTitle={val.episode}
                />
              );
            })
          : null}
        <Pagination
          defaultCurrent={1}
          total={3240}
          onChange={(num: number) => {
            setPage(num);
          }}
        />
        <Foot />
      </div>
    </ScrollBar>
  );
};
