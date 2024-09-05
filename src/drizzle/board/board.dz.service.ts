import { Injectable } from '@nestjs/common';
import { BoardDz } from './board.dz.entity';
import { BoardDzResp } from './dto/board.dz.resp';
import { DBClient } from 'src/config/db.client';

@Injectable()
export class BoardDzService {
  constructor(private readonly dbClient: DBClient) {}

  async selectAllBoards(): Promise<Array<BoardDzResp>> {
    const db = await this.dbClient.db();
    const queryResult = await db.select().from(BoardDz).execute();
    const boardDzResponses: Array<BoardDzResp> = queryResult.map((row) => {
      return new BoardDzResp(
        row.id,
        row.title,
        row.content,
        new Date(row.createdAt),
      );
    });
    return boardDzResponses;
  }
}
