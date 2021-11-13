export class ChatDTO {

  
  import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Unique } from "typeorm";
  import { User } from "src/users/user.entity";
  import { ScreenshotTimeIntervals } from "src/users/screenshot-interval.entity";
  
  @Entity()
  @Unique('UQ_subscriber', ['telegramId', 'chatId'])
  @Unique('UQ_chatTitle', ['chatTitle'])
  export class TelegramChat  {
     id: number;
  
     telegramId: string
  
     chatId: string
  
     isActive: boolean
  
     chatTitle: string
  
     user: User
  
     userId: number;
  
     screenshotTimeInterval: ScreenshotTimeIntervals
  
     screenshotTimeIntervalId: number
   
     hours: string
  
     ifOnline: boolean
  
     ifOffline: boolean
  
     createdDate: Date;
  
     updatedDate: Date;
  }


