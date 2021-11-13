// import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Unique } from "typeorm";
// import { User } from "src/users/user.entity";
// import { ScreenshotTimeIntervals } from "src/users/screenshot-interval.entity";

// @Entity()
// @Unique('UQ_subscriber', ['telegramId', 'chatId'])
// @Unique('UQ_chatTitle', ['chatTitle'])
// export class TelegramChat extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   telegramId: string

//   @Column()
//   chatId: string

//   @Column({ type: 'boolean', default: true })
//   isActive: boolean

//   @Column({ type: "varchar", default: 'Own chat'})
//   chatTitle: string

//   @ManyToOne(() => User, user => user.telegramChats)
//   user: User

//   @Column()
//   userId: number;

//   @ManyToOne(() => ScreenshotTimeIntervals, { eager: true })
//   screenshotTimeInterval: ScreenshotTimeIntervals

//   @Column({ type: 'integer', nullable: true })
//   screenshotTimeIntervalId: number

//   // @Column({ type: 'varchar', default: '1-7' })
//   // days: string

//   @Column({ type: 'varchar', default: '00:00-24:00'  })
//   hours: string

//   @Column({ type: 'boolean', default: false })
//   ifOnline: boolean

//   @Column({ type: 'boolean', default: false })
//   ifOffline: boolean

//   @CreateDateColumn({type: 'timestamp with time zone'})
//   createdDate: Date;

//   @UpdateDateColumn({type: 'timestamp with time zone'})
//   updatedDate: Date;
// }