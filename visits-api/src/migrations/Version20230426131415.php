<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230426131415 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__visit AS SELECT id, encoutered_person_id, reason_id, firstname, lastname, company, entrance_date, leaving_date FROM visit');
        $this->addSql('DROP TABLE visit');
        $this->addSql('CREATE TABLE visit (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, encoutered_person_id INTEGER NOT NULL, reason_id INTEGER NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, company VARCHAR(255) DEFAULT NULL, entrance_date DATETIME NOT NULL, leaving_date DATETIME DEFAULT NULL, CONSTRAINT FK_437EE93968D83309 FOREIGN KEY (encoutered_person_id) REFERENCES employee (id) ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_437EE93959BB1592 FOREIGN KEY (reason_id) REFERENCES reason (id) ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO visit (id, encoutered_person_id, reason_id, firstname, lastname, company, entrance_date, leaving_date) SELECT id, encoutered_person_id, reason_id, firstname, lastname, company, entrance_date, leaving_date FROM __temp__visit');
        $this->addSql('DROP TABLE __temp__visit');
        $this->addSql('CREATE INDEX IDX_437EE93959BB1592 ON visit (reason_id)');
        $this->addSql('CREATE INDEX IDX_437EE93968D83309 ON visit (encoutered_person_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE visit ADD COLUMN signature BLOB NOT NULL');
    }
}
