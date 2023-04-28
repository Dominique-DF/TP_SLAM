<?php

namespace App\DataFixtures;

use App\Entity\Reason;
use App\Entity\Visit;
use App\Entity\Employee;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;
    
    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $reasons = ['Rendez-vous commercial', 'Réparation', 'Suivi', 'Préparation oraux', 'Entretien d\'embauche', 'Autre'];
        foreach ($reasons as $reasonName) {
            $reason = new Reason();
            $reason->setReasonName($reasonName);
            $manager->persist($reason);
            $this->addReference($reasonName, $reason);
        }

        $employee = new Employee();
        $employee->setFirstName('Dominique');
        $employee->setLastname('Rigaudière');
        $manager->persist($employee);

        $visit = new Visit();
        $visit->setFirstname('Alexis');
        $visit->setLastname('Damien');
        $visit->setCompany('Boulangerie Ange');
        $visit->setEntranceDate(new \DateTime('2023-03-01 09:00:00'));
        $visit->setLeavingDate(new \DateTime('2023-03-01 10:00:00'));
        $visit->setEncouteredPerson($employee);
        $visit->setReason($this->getReference('Suivi'));
        // $visit->setSignature(0x00);
        $manager->persist($visit);
        
        $visit = new Visit();
        $visit->setFirstname('Jérémy');
        $visit->setLastname('Hayotte');
        $visit->setCompany('Essilor');
        $visit->setEntranceDate(new \DateTime('2023-03-02 14:00:00'));
        $visit->setEncouteredPerson($employee);
        $visit->setReason($this->getReference('Suivi'));
        // $visit->setSignature(0x00);
        $manager->persist($visit);

        $employee = new Employee();
        $employee->setFirstName('Caroline');
        $employee->setLastname('Seignez');
        $manager->persist($employee);

        $visit = new Visit();
        $visit->setFirstname('Gilberte');
        $visit->setLastname('Lagrange');
        $visit->setLastname('Office Dépôt');
        $visit->setEntranceDate(new \DateTime('2023-03-02 14:00:00'));
        $visit->setEncouteredPerson($employee);
        $visit->setReason($this->getReference('Rendez-vous commercial'));
        // $visit->setSignature(0x00);
        $manager->persist($visit);

        $employee = new Employee();
        $employee->setFirstName('Julie');
        $employee->setLastname('Alix');
        $manager->persist($employee);

        $visit = new Visit();
        $visit->setFirstname('Nono');
        $visit->setLastname('Le plombier');
        $visit->setCompany('Travaux Dijonnais');
        $visit->setEntranceDate(new \DateTime('2023-03-03 14:00:00'));
        $visit->setEncouteredPerson($employee);
        $visit->setReason($this->getReference('Réparation'));
        // $visit->setSignature(0x00);
        $manager->persist($visit);

        $employee = new Employee();
        $employee->setFirstName('Charlène');
        $employee->setLastname('Olivier');
        $manager->persist($employee);

        $user = new User();
        $user->setEmail('toto@toto.com');
        $user->setRoles(['ROLE_ADMIN']);
        // $user->setPassword('$2y$13$BI87u3OiuQ82VzjHFwOWvuxCYpA4zQ.dXGNOrHwVgFptvDtwGTPYC');
        $user->setPassword($this->passwordHasher->hashPassword($user, 'azerty'));
        $manager->persist($user);

        $user = new User();
        $user->setEmail('tutu@tutu.com');
        $user->setRoles(['ROLE_ADMIN']);
        // $user->setPassword('$2y$13$BI87u3OiuQ82VzjHFwOWvuxCYpA4zQ.dXGNOrHwVgFptvDtwGTPYC');
        $user->setPassword($this->passwordHasher->hashPassword($user, 'azerty'));
        $manager->persist($user);

        $manager->flush();
    }
}
