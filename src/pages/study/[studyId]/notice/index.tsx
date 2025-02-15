import styled from '@emotion/styled';
import Link from 'next/link';
import { StudyBanner } from '../../../../components/StudyMain/StudyBanner';
import { Button } from '../../../../components/Notice/Button';
import { NoticeTitle } from '../../../../components/Notice/NoticeTitle';
import { COLOR } from '../../../../constants';
import { NoticeList } from '../../../../components/Notice/NoticeList';
import { INoticeRes } from '../../../../types/Notice';
import useSWR from 'swr';
import { useRouter } from 'next/router';

export default function NoticePage(): JSX.Element {
  //ROUTER
  const router = useRouter();
  const { studyId } = router.query;

  //GET DATA
  const { data } = useSWR<INoticeRes>(`/api/notice/${Number(studyId)}/total`);

  //
  return (
    <>
      <StudyBanner />
      <NoticeTitle />
      <Table>
        <caption>
          스터디 공지사항 번호, 말머리, 제목, 작성일, 등록일시 정보 제공
        </caption>
        <colgroup>
          <col className="col-num" />
          <col className="col-category" />
          <col />
          <col className="col-writer" />
          <col className="col-date" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className="col-num">
              번호
            </th>
            <th scope="col" className="col-category">
              말머리
            </th>
            <th scope="col">제목</th>
            <th scope="col" className="col-writer">
              작성자
            </th>
            <th scope="col" className="col-date">
              등록일시
            </th>
          </tr>
        </thead>
        <>
          {data?.allNotice?.map((data) => {
            return (
              <tbody key={data.id}>
                <NoticeList
                  studyId={data.studyId}
                  num={data.id}
                  category={data.category}
                  title={data.title}
                  writer={data.author.username}
                  date={data.createdAt}
                />
              </tbody>
            );
          })}
        </>
      </Table>
      <Page>
        <ol>
          <li>
            <a href="#" className="active">
              1
            </a>
          </li>
          <li>
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
        </ol>
      </Page>
      <BtnGroup>
        <Link href={`/study/${Number(studyId)}/notice/write`}>
          <a>
            <Button type="button" text="글작성" className="write" />
          </a>
        </Link>
      </BtnGroup>
    </>
  );
}

const Table = styled.table`
  font-family: 'Noto Sans KR';
  width: 100%;

  caption {
    overflow: hidden;
    position: static;
    clip: rect(0, 0, 0, 0);
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
  }
  .col-num {
    width: 10%;
  }
  .col-category {
    width: 10%;
  }
  .col-writer {
    width: 10%;
  }
  .col-date {
    width: 15%;
  }
  @media (max-width: 640px) {
    .col-num,
    .col-date {
      display: none;
    }
    .col-num {
      width: 60px;
    }
    .col-category {
      width: 80px;
    }
    .col-writer {
      width: 80px;
    }
    .col-date {
      width: 80px;
    }
  }

  th {
    color: ${COLOR.main};
    border-bottom: 1px solid ${COLOR.main};
    padding: 1rem 0;
    font-weight: bold;
    font-size: 14px;
  }
  tr {
    transition: all 0.3s;
    &:hover {
      background: #f9f9f9;
    }
  }
  td {
    border-bottom: 1px solid #ddd;
    padding: 0.4rem;
    text-align: center;
    vertical-align: middle;
    &.notice-title {
      text-align: left;
      a {
        display: block;
        padding: 0.8rem;
      }
    }
  }
`;

const Page = styled.div`
  margin: 2rem 0;
  position: relative;
  ol {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    color: #999;
    li {
      a {
        padding: 0.3rem 0.3rem;
        border-bottom: 2px solid transparent;
        &.active {
          font-weight: bold;
          color: #000;
          border-bottom: 2px solid #000;
        }
      }
    }
  }
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;
