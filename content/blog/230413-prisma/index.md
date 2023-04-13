---
title: 'Prisma로 백엔드 없이 개발하기'
date: '2023-04-13T11:45:32.169Z'
description: '차세대 ORM 프레임워크로 불리는 Prisma가 무엇인지 간단한 예제를 통해서 정리했습니다.'
category: 'Javascript'
keywords: 'prisma, next.js'
image: 'https://velog.velcdn.com/images/khy226/post/ad78ff57-6502-4936-a4a8-fd9f2cf35940/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/ad78ff57-6502-4936-a4a8-fd9f2cf35940/image.png" style="margin: 0 auto; width: 60%; padding-bottom: 50px;" alt="thumbnail"/>

따로 백엔드 API 서버를 구축하지 않고도 프로젝트를 개발 할 수 있는 방법을 찾아보던 도중, **Prisma**라는 ORM 프레임워크를 알게 되었습니다. 최근에 Prisma ORM으로 자바스크립트 / 타입스크립트로 프로젝트를 작업하는 사례가 많아지고 있는데, 차세대 ORM 프레임워크로 불리는 Prisma가 무엇인지 간단한 예제를 통해서 알아봅시다.

> 공식 도큐 설명은 [Prisma - Quickstart](https://www.prisma.io/docs/getting-started/quickstart) 에서 볼 수 있습니다.

<br />

### Prisma란?

Prisma는 오픈 소스 **차세대 ORM**입니다. Prisma를 구성 대표적인 요소는 다음과 같습니다:

- Prisma Client: Node.js & TypeScript용 쿼리 작성 클라이언트
- Prisma Migrate: 마이그레이션 시스템
- Prisma Studio: 데이터베이스의 데이터를 보고 편집하는 GUI

Prisma Client는 모든 Node.js(지원되는 버전) 또는 TypeScript 백엔드 애플리케이션(서버리스 애플리케이션 및 마이크로서비스 포함)에서 사용할 수 있습니다. REST API, GraphQL API, gRPC API 등 데이터베이스가 필요한 모든 것이 될 수 있습니다.

Prisma는 어플리케이션을 개발할 때 개발자가 직접 SQL 문을 작성하지 않아도 데이터베이스와 상호작용할 수 있는 ORM입니다. 기존 ORM들과의 차이점은 Prisma는 자체적인 스키마 문법을 제공하고, 이 스키마를 직접 조작하여 DB 마이그레이션, 클라이언트 코드 생성 등 자동으로 생성할 수 있습니다.

즉, 개발자 입장에서 DB 접근을 위한 코드 작성을 줄일 수 있고, 스키마 파일 하나만 잘 관리하면 되기 때문에 유지보수가 매우 수월해집니다. 뿐만 아니라, 간편한 CLI와 Prisma Studio등 편리한 GUI 도구가 잘 갖춰져 있어 개발자 경험과 생산성이 매우 좋아집니다.

<br />

![prisma 사진](https://velog.velcdn.com/images/khy226/post/53ed5d29-db1e-4f5d-8420-27e4f1960e7f/image.png)

<small style="text-align:center;">누구나 편하게 읽고 사용할 수 있는 Prisma 스키마를 설명하는 공식 사이트 설명 ⬆</small>

<br />

### Prisma CLI 설치

우선, typescript 프로젝트가 있다는 전제하에 진행하겠습니다. 타입스크립트 프로젝트는 아래와 같이 세팅 할 수 있으며, `typescript ts-node @types/node` 패키지를 필수적으로 설치해야합니다.

- 프로젝트 생성

```
mkdir hello-prisma
cd hello-prisma
```

- 타입스크립트 세팅

```
npm init -y
npm install typescript ts-node @types/node --save-dev
npx tsc --init
```

이제 Prisma를 더욱 편리하게 사용할 수 있도록 **Prisma CLI**를 설치해봅시다. 작업하려는 프로젝트 디렉토리에서 npm 패키지 매니저로 prism를 개발 의존성 모드로 설치합니다.

```
npm install prisma --save-dev
```

Prisma CLI를 설치하면 `npx`로 `prisma` 커맨드를 사용할 수 있습니다. `prisma` 커맨드를 실행하면 아래와 같은 설명이 나옵니다.

```$ npx prisma

◭  Prisma is a modern DB toolkit to query, migrate and model your database (https://prisma.io)

Usage

  $ prisma [command]

Commands

            init   Set up Prisma for your app
        generate   Generate artifacts (e.g. Prisma Client)
              db   Manage your database schema and lifecycle
         migrate   Migrate your database
          studio   Browse your data with Prisma Studio
        validate   Validate your Prisma schema
          format   Format your Prisma schema

Flags

     --preview-feature   Run Preview Prisma commands

Examples

  Set up a new Prisma project
  $ prisma init

  Generate artifacts (e.g. Prisma Client)
  $ prisma generate

  Browse your data
  $ prisma studio

  Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
  $ prisma migrate dev

  Pull the schema from an existing database, updating the Prisma schema
  $ prisma db pull

  Push the Prisma schema state to the database
  $ prisma db push

  Validate your Prisma schema
  $ prisma validate

  Format your Prisma schema
  $ prisma format

```

<br />

### Prisma 프로젝트 설정하기

이제 Prisma CLI로 Prisma 프로젝트를 생성해보겠습니다.

```
npx prisma init

✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Run prisma db pull to turn your database schema into a Prisma schema.
3. Run prisma generate to generate the Prisma Client. You can then start querying your database.

More information in our documentation:
https://pris.ly/d/getting-started
```

기본적으로 Prisma는 PostgreSQL를 데이터베이스로 사용하기 때문에, 다른 DB를 사용하려고 한다면 아래와같이 `--datasource-provider`를 줘야합니다.

```
npx prisma init --datasource-provider sqlite
```

해당 커맨드를 치고나면 `schema.prisma` 파일이 생성되어있습니다.

```
├── .env
├── .gitignore
├── node_modules
├── package-lock.json
├── package.json
└── prisma
    └── schema.prisma
```

아래는 `schema.prisma` 파일 기본 내용입니다.

```typescript
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

```

`.env` 파일에 `DATABASE_URL`을 넣어주어야 하는데, 저는 [supabase](https://supabase.com/)의 postgresql 데이터베이스를 생성해서 해당 url를 추가해주었습니다.

```
DATABASE_URL="postgresql://postgres:[~~~~]:5432/postgres"
```

<br />

### Prisma 스키마

이제 `schema.prisma` 파일에서 직접 스키마를 작성해봅시다. Prisma는 어떤 데이터베이스를 사용하든지 동일한 스키마 문법을 통해 데이터 모델링을 할 수 있습니다.

아래 예시에서 기본적인 유저(User)와 게시글(Post) 모델에 대한 스키마를 작성해보겠습니다.

```typescript
model User {
  id    String     @id @default(uuid())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @default(now())
  userId       String?
  user         User?  @relation("posts", fields: [userId], references: [id])
  @@index([userId])
}
```

모델은 `model 모델명 { ... }` 형식으로 정의하고 그 안에 `id`, `email`, `name`과 같은 필드(field)등을 추가해주면 됩니다. 해당 모델은 데이터베이스의 테이블(table)이 되고, 필드는 컬럼(column)이 됩니다.

필드를 정의할 때는 `필드명 타입 기본값/관계/추가옵션들(선택)`를 순서대로 넣어주면 됩니다. 데이터 모델링과 관련해서는 [공식 도큐 - Data model](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model) 글을 확인하면 좋습니다.

<br />

### Prisma 마이그레이션

앞서 작성한 스키마를 DB에 반영하기 위해서는 마이그레이션을 해주어야 합니다. 아래와 같이 `prisma migrate dev` 커맨드를 입력해주세요.

```
npx prisma migrate dev
```

위와 같이 혹은 이름 (`--name`)옵션을 커맨드라인에서 미리 제공할 수도 있습니다.

```
npx prisma migrate dev --name init
```

위 명령어는 크게 두 가지 작업을 수행합니다:

- `prisma/migration` 폴더 안에 SQL 마이그레이션 파일들을 생성
- 데이터베이스에 실제 SQL 마이그레이션 파일을 적용

마이그레이션 파일들은 `prisma/migration`파일에 생성되는데, 현재 날짜와 시간 그리고 위에서 입력한 `--name` 문자열이 조합되어 폴더명이 생성됩니다.

```
└── prisma
    └── schema.prisma
    └── migrations
    	└── 20230331052907_init
        	└── migration.sql
```

(참고로, 해당 migrations 파일들은 직접 수정하면 안됩니다. 이후 마이그레이션을 할 때 꼬일 수 있습니다.)

해당 `migration.sql` 파일 안에는 postgresql 디비에 테이블과 인덱스를 생성하기 위한 SQL이 적혀있습니다.

```sql
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Post_userId_idx" ON "Post"("userId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

```

이제 실제 테이블이 데이터베이스에 만들어졌고, 데이터를 생성/수정/삭제/읽기가 가능해졌습니다.

<br />

### Prisma로 API 작업하기

이제 Prisma를 통해 사용자를 생성하는 간단한 쿼리를 작업해보겠습니다. `@prisma/client` 패키지에서 `PrismaClient` 클래스를 불러올 수 있는데, 해당 PrismaClient 클래스로 데이터를 생성하고 조회/수정/삭제할 수 있습니다.

간단한 예제를 위해 `script.ts`라는 스크립트 파일을 생성합니다.

```
touch script.ts
```

그리고 아래와 같은 코드를 작성하여 user 데이터를 생성하고, 모든 user 데이터를 가져와 조회할 수 있습니다.

```ts
// script.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 하나의 user 생성
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  })
  console.log(user)

  // 모든 user 조회
  const users = await prisma.user.findMany()
  console.log(users)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

이제 터미널에서 `ts-node` 커맨드로 스크립트를 실행하면 아래와 같은 결과를 확인할 수 있습니다.

```typescript
npx ts-node script.ts

{ id: 1, email: 'alice@prisma.io', name: 'Alice' }
[{ id: 1, email: 'alice@prisma.io', name: 'Alice' }]
```

<br />

### Prisma Studio (관리자 페이지)

Prisma의 장점중 하나는, 데이터베이스에 저장된 데이터를 편리하게 확인할 수 있도록 Prisma Studio라는 GUI 도구를 제공한다는 것입니다. 커맨트에서 `npx prisma studio`를 입력하면 `http://localhost:5555`에서 아래와 같이 데이터를 확인할 수 있는 툴이 열립니다.

```
> npx prisma studio
...
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Prisma Studio is up on http://localhost:5555
```

![](https://velog.velcdn.com/images/khy226/post/34fe67ac-aff0-482f-bb98-62601777e151/image.png)

데이터를 직접 확인할 수 있고, 생성/수정/삭제/열람이 모두 가능해서 개발할때 매우 편리합니다.

<br />

### 마치며

해당 글을 통해 차세대 ORM 프레임워크로 불리는 Prisma에 대해 간단하게 알아보았습니다. 이 외에도 쿼리 사용 방법, 데이터 베이스별 연동 방법, 복잡한 스키마 작성법 등 심화 내용은 [공식 가이드](https://www.prisma.io/docs/guides)에서 확인할 수 있으니 참고 부탁드리겠습니다.

Prisma로 데이터 모델링을 하면, 다양한 데이터베이스에도 동일한 prisma 문법을 사용해서 간편하게 스키마를 만들고, 마이그레이션, 쿼리까지 작업할 수 있다는 점이 매우 편리했습니다. 특히, Next.js의 API routes와 supabase를 이용해 백엔드 없이도 프로젝트를 작업할 수 있다는게 프론트엔드 개발자로서 매우 만족스러웠습니다. 이 외에도 Sequelize나 TypeORM 같은 ORM이 있다고 하는데 추후 프로젝트에서 다뤄봐야겠습니다.

<br />

---

### 참고

> - [Prisma 처음 시작하기](https://www.daleseo.com/prisma/)
> - [Prisma Docs](https://www.prisma.io/docs/getting-started/quickstart)
